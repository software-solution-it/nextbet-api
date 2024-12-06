const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')
const SelectFinanceWithdrawProcessing = require('../../model/Mysq/Select/SelectFinanceWithdrawProcessing/SelectFinanceWithdrawProcessing')
const SelectMemberStatePendenteWithdraw = require('../../model/Mysq/Select/SelectMemberStatePendenteWithdraw/SelectMemberStatePendenteWithdraw')

async function FinanceWithdrawProcessingCore(token, res)
{
    let select_user_token = await SelectTokenUser(token)

    if (select_user_token) {

        let select_withdraw_finance_processing = await SelectFinanceWithdrawProcessing()


        select_withdraw_finance_processing[0].id = ""
        select_withdraw_finance_processing[0].bid = ""
        select_withdraw_finance_processing[0].amount = ""
        select_withdraw_finance_processing[0].ramount = ""
        select_withdraw_finance_processing[0].state = ""
        select_withdraw_finance_processing[0].created_at = ""
        console.log(select_withdraw_finance_processing[0])

        // 373 retorna isso quando solicita


        let select_withdraw_peding = await SelectMemberStatePendenteWithdraw(select_user_token.username)

        if (select_withdraw_peding) {

            select_withdraw_finance_processing[0].id = select_withdraw_peding.id
            select_withdraw_finance_processing[0].bid = ""
            select_withdraw_finance_processing[0].amount =select_withdraw_peding.amount
            select_withdraw_finance_processing[0].ramount = select_withdraw_peding.ramount
            select_withdraw_finance_processing[0].state = select_withdraw_peding.state
            select_withdraw_finance_processing[0].created_at = select_withdraw_peding.created_at


            let response_json_finance_withdraw = {
                "status": true,
                "data": select_withdraw_finance_processing[0]
            }
    
            res.json(response_json_finance_withdraw)
        }
        else
        {
            let response_json_finance_withdraw = {
                "status": true,
                "data": select_withdraw_finance_processing[0]
            }
    
            res.json(response_json_finance_withdraw)
        }
   

    }
    else
    {
        res.json({"status":false,"data":"Not Auth"})

    }
}

module.exports = FinanceWithdrawProcessingCore