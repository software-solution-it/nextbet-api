const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')
const SelectTokenUserName = require('../../model/Mysq/SelectTokenUser/SelectTokenUserName')
const fetchAndSumBets = require('../../model/Mysq/SelectTokenUser/ConsultValor')
const SelectUser = require('../../model/Mysq/SelectUser/SelectUser')
const SumValidBetAmountByUsername = require('../../model/Mysq/SumValidBetAmountByUsername/SumValidBetAmountByUsername')
const InsertMemberRecordTradeReturnID = require('../../model/Mysq/Insert/InsertMemberRecordTrade/InsertMemberRecordTradeReturnID')
const UpdateBalanceUserByUsername = require('../../model/Mysq/Update/UpdateBalanceUserByUsername/UpdateBalanceUserByUsername')
const GenerationToken = require('../../utils/tokenAuth/tokenAuth')
const SelectBankCardWithdraw = require('../../model/Mysq/Select/BankCard/SelectBankCardWithdraw/SelectBankCardWithdraw')
const UpdateTotalWithdraw = require('../../model/Mysq/Update/UpdateTotalWithdraw/UpdateTotalWithdraw')
const knex  = require("../../utils/knex/config");

async function FinanceWithdrawCore(token, body, res, timestampInSeconds) {

let settings = await knex.table('software_settings').where('id', 1).first();
    let select_user_token = await SelectTokenUser(token)
    let select_user_token_name = await SelectTokenUserName(token)
    let sumUserBet = await SumValidBetAmountByUsername(select_user_token_name)
    

    




    if (select_user_token) {
        let amount = body.amount

        let bank_id = body.bank_id

        let password = parseInt(body.password)
        
        
         const rolloverEnabled = settings['rollover'] === 1;

     if (rolloverEnabled && select_user_token.ult_deposito > sumUserBet) {
        res.json({
            "status": false,
            "data": `Saldo carteira:${totalValidBets} DepositoR$: ${select_user_token.ult_deposito} quanto voce rodou: ${sumUserBet}`
        });
        return; // Exit early if rollover is not fulfilled
    }
    
    
        if (password === select_user_token.withdraw_pwd) {
            if (amount < 0) {
                res.json({ "status": false, "data": "Saldo negativo !" })
                
              		
            }
            else {
                if (select_user_token.balance >= amount) {

                    let generation_bill_no = await GenerationToken(20)

                    let select_bank_card_withdraw = await SelectBankCardWithdraw(select_user_token.id, bank_id)

                    let account = select_bank_card_withdraw.ty === 3 ? select_bank_card_withdraw.bank_card : select_bank_card_withdraw.content
                    let data_insert_withdraw_ = {
                        "flag": 272,
                        "ty": select_bank_card_withdraw.ty,
                        "bill_no": generation_bill_no,
                        "platform_id": "0",
                        "transfer_type": 2,
                        "amount": amount,
                        "created_at": timestampInSeconds,
                        "state": 373, // 373 pendente // 374 concluido
                        "remark": "",
                        "username": select_user_token.username,
                        "parent_name": select_user_token.parent_name,
                        "balance": select_user_token.balance,
                        "channel_id": "1",
                        "channel_name": "PIX",
                        "pay_name": "",
                        "real_name": select_bank_card_withdraw.realname,
                        "account": account,
                        "updated_at": 0,
                        "ramount": amount,
                        "discount": "0.0000"

                    }



                    let insert_withdraw_member = await InsertMemberRecordTradeReturnID(data_insert_withdraw_)

                    if (insert_withdraw_member) {

                        let new_balance = select_user_token.balance - amount

                        let update_balance = await UpdateBalanceUserByUsername(new_balance, select_user_token.username)

                        if (update_balance === 1) {

                            let new_total_withdra = select_user_token.total_wdraw_amount + parseFloat(amount)

                            let update_new_total_amount = await UpdateTotalWithdraw(new_total_withdra, select_user_token.username)

                            if (update_new_total_amount === 1) {
                                res.json({ "status": true, "data": insert_withdraw_member[0] })

                            }
                            else {
                                res.json({ "status": false, "data": "Error interno code 2305" })

                            }
                        }
                        else {
                            res.json({ "status": false, "data": "Error interno code 2005" })

                        }

                    }
                    else {
                        res.json({ "status": false, "data": "Error interno code 2003" })

                    }

                }
                else {
                    res.json({ "status": false, "data": "Saldo insuficiente" })

                }
            }

        }
        else {
            res.json({ "status": false, "data": "1251" })
        }
    }
    else {
        res.json({ "status": false, "data": "Not Auth" })
    }

}

module.exports = FinanceWithdrawCore