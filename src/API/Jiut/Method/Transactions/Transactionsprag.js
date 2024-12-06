const UpdateBalanceUserByUsername = require('../../../../model/Mysq/Update/UpdateBalanceUserByUsername/UpdateBalanceUserByUsername');
const InsertTransactions = require('../Transactions/Model/Mysql/Insert/InsertTransactions/InsertTransactions');
const SelectGamesAgregationKeysPragmatic = require('../../../../model/Mysq/Select/SelectGamesAgregationKeys/SelectGamesAgregationKeysPragmatic');
const moment = require('moment-timezone');
const SelectUser = require('../../../../model/Mysq/SelectUser/SelectUser');
const AddVipBetValid = require('../../JiutApiController/Events/Vip/AddVipBetValid/AddVipBetValid');
const UpdateValidBetAmount = require('./Model/Mysql/UpdateValidBetAmount/UpdateValidBetAmount');
const SelectMemberInviteRecordStatus = require('./Model/Mysql/Select/SelectMemberInviteRecordStatus');
const knex = require('../../../../utils/knex/config');

async function Transactionsprag(req, res) {

    let body = req.body;

    let obj_recebido = {
        user_code: body.user_code,
        agent_code: body.agent_code,
        agent_secret: body.agent_secret
    }

 let user = await SelectUser(obj_recebido.user_code, 'username');
 
    const timestamp = moment.tz("America/Sao_Paulo").unix();
    const select_game_aggregation_keys = await SelectGamesAgregationKeysPragmatic();

    switch (body.method) {
        case 'user_balance':
            if (user) {
                res.json({
                    "status": 1, // Should return even though user_balance is 0
                    "user_balance": user.balance
                })
            }
            break;
        case 'transaction':
                if (user) {
                    if (user.balance <= 0) {
                        return res.json({
                            "status": 0,
                            "msg": "INSUFFICIENT_USER_FUNDS"
                        });
                    }


                    let bet_amount = parseFloat(body.slot.bet_money) || 0;
                    let win_amount = parseFloat(body.slot.win_money) || 0;
                    
                    let net_amount;
                    if (bet_amount > 0 && win_amount === 0) {
                        net_amount = -bet_amount;
                    } else if (bet_amount === 0 && win_amount > 0) {
                        net_amount = win_amount;
                    } else if (bet_amount > 0 && win_amount > 0) {
                        net_amount = win_amount - bet_amount;
                    } else {
                        console.log("Invalid transaction detected:", { bet_amount, win_amount });
                        return res.json({ "status": 0, "msg": "INVALID_TRANSACTION" });
                    }



                    console.log("Processing transaction:", {
                        txid: body.slot.txn_id,
                        bet_amount,
                        win_amount,
                        net_amount,
                        current_balance: user.balance
                    });

                    // Use a transaction to ensure atomicity
                    await knex.transaction(async trx => {
                        try {
                            let existingTransaction = await trx('member_record_game').where('bill_no', body.slot.txn_id).first();
                            if (existingTransaction) {
                                console.log("Duplicate transaction detected:", body.slot.txn_id);
                                return res.json({ "status": 0, "msg": "DUPLICATED_REQUEST" });
                            }

                            let data_insert = {
                                "bill_no": body.slot.txn_id,
                                "api_type": 26595015200313,
                                "api_types": "26595015200313",
                                "player_name": "",
                                "name": obj_recebido.user_code,
                                "net_amount": net_amount,
                                "bet_time": timestamp,
                                "game_type": body.game_type,
                                "bet_amount": bet_amount,
                                "valid_bet_amount": bet_amount,
                                "flag": 1,
                                "play_type": body.slot.game_code,
                                "prefix": "f90",
                                "result": "gameName:" + body.slot.game_code,
                                "api_name": body.slot.provider_code,
                                "api_bill_no": body.slot.txn_id,
                                "game_name": body.slot.game_code
                            };

                            await trx('member_record_game').insert(data_insert);

                            let new_balance = parseFloat((user.balance + net_amount).toFixed(2));
                            console.log("User balance before update:", user.balance);
                            console.log("Net amount to adjust:", net_amount);
                            console.log("New calculated balance:", new_balance);

                            await trx('users').where('username', obj_recebido.user_code).update({ balance: new_balance });

                            let user_renovated = await trx('users').where('username', obj_recebido.user_code).first();
                            let add_vip = await AddVipBetValid(trx, bet_amount, obj_recebido.user_code);

                            if (add_vip) {
                                let select_member_invite_record = await SelectMemberInviteRecordStatus(obj_recebido.user_code);

                                let log_invite_record_bet_amount = {
                                    username: obj_recebido.user_code,
                                    valid_bet_amount_member: select_member_invite_record ? select_member_invite_record.valid_bet_amount : 0,
                                    bet_amount: bet_amount,
                                    model_log: select_member_invite_record
                                };

                                console.log('log invite record amount',log_invite_record_bet_amount);

                                if (select_member_invite_record === undefined) {
                                    await trx.commit();
                                    return res.json({
                                        "status": 1,
                                        'tnx': body.slot.txn_id,
                                        "user_balance": user_renovated.balance
                                    });
                                } else {
                                    let new_bet_valid = select_member_invite_record.valid_bet_amount + bet_amount;
                                    await UpdateValidBetAmount(new_bet_valid, obj_recebido.user_code);
                                    await trx.commit();
                                    return res.json({
                                        "status": 1,
                                        'tnx': body.slot.txn_id,
                                        "user_balance": user_renovated.balance
                                    });
                                }
                            } else {
                                console.log("VIP bet update failed for user:", obj_recebido.user_code);
                                return res.json({ "status": 0, "msg": "VIP_BET_UPDATE_FAILED" });
                            }
                        } catch (error) {
                            console.error("Transaction error:", error);
                            await trx.rollback();
                            return res.json({ "status": 0, "msg": "INTERNAL_ERROR" });
                        }
                    });
                } else {
                    console.log("User not found:", obj_recebido.user_code);
                    return res.json({ "status": 0, "msg": "USER_NOT_FOUND" });
                }
           
            break;
        default:
            break;
    }
   
}

module.exports = Transactionsprag;