const UpdateBalanceUserByUsername = require('../../model/Mysq/Update/UpdateBalanceUserByUsername/UpdateBalanceUserByUsername')
const UpdateStateMemberTradeRecord = require('../../model/Mysq/Update/UpdateStateMemberTradeRecord/UpdateStateMemberTradeRecord')
const UpdateFirstDepositUser = require('../../model/Mysq/Update/UpdateFirstDepositUser/UpdateFirstDepositUser')
const UpdateUltDepositoUser = require('../../model/Mysq/Update/UpdateFirstDepositUser/UpdateUltDepositUser')
const SelectUser = require('../../model/Mysq/SelectUser/SelectUser')
const InsertPromotionRewardRecord = require('../../model/Mysq/Insert/InsertPromotionRewardRecord/InsertPromotionRewardRecord')
const generate_unique_token = require('../../utils/tokenAuth/tokenAuth')
const SelectFinanceBonusListByAmount = require('../../model/Mysq/Select/SelectFinanceBonusListByAmount/SelectFinanceBonusListByAmount')
const SelectDepositGenerationID = require('../../model/Mysq/Select/SelectDepositGenerationID/SelectDepositGenerationID')
const UpdateTotalDepAmount = require('../../model/Mysq/Update/UpdateTotalDepAmount/UpdateTotalDepAmount')
// const SelectFirstDepositRules 
const UpdateInviteDeposit = require('../../model/Mysq/Update/UpdateInviteDeposit/UpdateInviteDeposit')
const SelectMemberInviteRecordStatus = require('../../API/Jiut/Method/Transactions/Model/Mysql/Select/SelectMemberInviteRecordStatus')

const SelectPorcentEventBonusLock = require('./Model/Mysql/SelectPorcentEventBonusLock/SelectPorcentEventBonusLock')

const UpdateLockAmount = require('./Model/Mysql/UpdateLockAmount/UpdateLockAmount')
const moment = require('moment-timezone');

async function calcularPorcentagem(porcentagem, numero) {
    return (porcentagem / 100) * numero;
}


exports.verify_payment_digitopay = async function (req, res) {
    const currentDate = new Date();

    const timestampInSeconds = moment.tz("America/Sao_Paulo").unix();


    const body = req.body.requestBody
    console.log(body)


    if (body.success === true) {

        let payment_record_trade = await SelectDepositGenerationID(body.external_id)

        if (payment_record_trade) {
            let username = payment_record_trade.username

            if (payment_record_trade.transaction_id_suitpay === body.payload.id && payment_record_trade.state === 361) {

                let user = await SelectUser(username, 'username')

                console.log(parseFloat(user.first_deposit_amount))
                if (parseFloat(user.first_deposit_amount) > 0) {

                    let update_ult_deposito = await UpdateUltDepositoUser(payment_record_trade.amount, username)
                    console.log(update_ult_deposito)

                    let update_state_payment = await UpdateStateMemberTradeRecord(362, body.payload.id)

                    if (update_state_payment === 1) {


                        let total_dept_amount = parseFloat(user.total_dept_amount)
                        let new_total_dept_amount = total_dept_amount + payment_record_trade.amount

                        let update_total_deposit = await UpdateTotalDepAmount(new_total_dept_amount, username)

                        if (update_total_deposit === 1) {
                            let new_balance = parseFloat(user.balance) + payment_record_trade.amount



                            let update_balance = await UpdateBalanceUserByUsername(new_balance, username)

                            let select_invite_dept_amount = await SelectMemberInviteRecordStatus(username)
                            if (select_invite_dept_amount != undefined) {
                                let new_dept_amount = select_invite_dept_amount.deposit_amount + payment_record_trade.amount

                                let update_invite_deps_amount = await UpdateInviteDeposit(new_dept_amount, username)

                                if (update_invite_deps_amount === 1) {
                                    if (update_balance === 1) {
                                        console.log('pagamento concluido')
                                        res.json({ "status": true, "data": "its okay now" })

                                    }
                                    else {
                                        res.json({ "status": false, "data": "fail update bl" })

                                    }
                                }
                                else {
                                    res.json({ "status": false, "data": "fail update invit_t_m" })

                                }
                            } else {
                                res.json({ "status": true, "data": "its okay now" })

                            }
                        }
                        else {
                            res.json({ "status": false, "data": "fail update first_dp" })
                        }
                    }
                    else {
                        res.json({ "status": false, "data": "fail update state" })
                    }

                }
                else {
                    let update_state_payment = await UpdateStateMemberTradeRecord(362, body.payload.id)

                    if (update_state_payment === 1) {

                        let total_dept_amount = parseFloat(user.total_dept_amount)
                        let new_total_dept_amount = total_dept_amount + payment_record_trade.amount

                        let update_ult_deposito = await UpdateUltDepositoUser(payment_record_trade.amount, username)

                        let update_total_deposit = await UpdateTotalDepAmount(new_total_dept_amount, username)

                        if (update_total_deposit === 1) {

                            let new_first_Deposit = parseFloat(user.first_deposit_amount) + payment_record_trade.amount


                            let update_first_deposit = await UpdateFirstDepositUser(new_first_Deposit, timestampInSeconds, username)

                            const select_finance_bonus_list = await SelectFinanceBonusListByAmount(payment_record_trade.amount)

                            if (select_finance_bonus_list) {
                                let insert_reward_record_data = {
                                    "flag": 274,
                                    "ty": 1,
                                    "bill_no": await generate_unique_token(),
                                    "platform_id": "",
                                    "transfer_type": 105,
                                    "amount": select_finance_bonus_list.bonus_amount,
                                    "created_at": timestampInSeconds,
                                    "state": 232,
                                    "remark": select_finance_bonus_list.title,
                                    "username": user.username,
                                    "parent_name": user.parent_name,
                                    "balance": user.balance,
                                    "channel_id": "218",
                                    "channel_name": "",
                                    "pay_name": "",
                                    "real_name": "",
                                    "account": "",
                                    "updated_at": 0,
                                    "ramount": "",
                                    "discount": ""
                                }

                                let insert_bonus_first_deposit_record = await InsertPromotionRewardRecord(insert_reward_record_data)


                                if (update_first_deposit === 1 && insert_bonus_first_deposit_record === 1) {

                                    let new_balance = parseFloat(user.balance) + payment_record_trade.amount + select_finance_bonus_list.bonus_amount

                                    let update_balance = await UpdateBalanceUserByUsername(new_balance, username)

                                    let select_invite_dept_amount = await SelectMemberInviteRecordStatus(username)

                                    let new_dept_amount = select_invite_dept_amount.deposit_amount + payment_record_trade.amount

                                    let update_invite_deps_amount = await UpdateInviteDeposit(new_dept_amount, username)
                                    if (update_invite_deps_amount === 1) {
                                        if (update_balance === 1) {

                                            let select_event_promotion_bonus_config = await SelectPorcentEventBonusLock()

                                            if (select_event_promotion_bonus_config.status === 1) {

                                                let vallue_amount_lock = await calcularPorcentagem(select_event_promotion_bonus_config.porcent_recive, new_balance)
                                                let update_lock_balance = user.lock_amount + vallue_amount_lock

                                                let new_goal = user.goal_luck + (payment_record_trade.amount * select_event_promotion_bonus_config.rollover_multiply)


                                                let update_lock_and_goal = await UpdateLockAmount(update_lock_balance, new_goal, user.username)

                                                if (update_lock_and_goal === 1) {
                                                    console.log('pagamento concluido')
                                                    res.json({ "status": true, "data": "its okay now" })
                                                }
                                                else {
                                                    console.log('pagamento concluido mas deu error no lock amount')
                                                    res.json({ "status": true, "data": "its okay now" })
                                                }

                                            } else {
                                                console.log('pagamento concluido')
                                                res.json({ "status": true, "data": "its okay now" })

                                            }

                                        }
                                        else {
                                            res.json({ "status": false, "data": "fail update bl" })

                                        }
                                    }
                                    else {
                                        res.json({ "status": false, "data": "fail update invit_t_m" })

                                    }

                                }
                                else {
                                    res.json({ "status": false, "data": "fail update first_dp" })
                                }
                            }

                            else {

                                if (update_first_deposit === 1) {

                                    let new_balance = parseFloat(user.balance) + payment_record_trade.amount

                                    let update_balance = await UpdateBalanceUserByUsername(new_balance, username)


                                    let select_invite_dept_amount = await SelectMemberInviteRecordStatus(username)

                                    let new_dept_amount = select_invite_dept_amount.deposit_amount + payment_record_trade.amount

                                    let update_invite_deps_amount = await UpdateInviteDeposit(new_dept_amount, username)
                                    if (update_invite_deps_amount === 1) {
                                        if (update_balance === 1) {
                                            console.log('pagamento concluido')
                                            res.json({ "status": true, "data": "its okay now" })

                                        }
                                        else {
                                            res.json({ "status": false, "data": "fail update bl" })

                                        }
                                    }
                                    else {
                                        res.json({ "status": false, "data": "fail update invit_t_m" })

                                    }

                                }
                                else {
                                    res.json({ "status": false, "data": "fail update first_dp" })
                                }
                            }


                        }
                        else {
                            res.json({ "status": false, "data": "fail update total_dt" })
                        }
                    }
                    else {
                        res.json({ "status": false, "data": "fail update state" })
                    }


                    console.log(' é seu primeiro deposito libera bonus')
                }
            }
            else {
                res.json({ "status": false, "data": "duplicate payment no permission" })

            }
        }
    }
    else {
        res.json({ "status": false, "data": "fail payment" })
    }
}