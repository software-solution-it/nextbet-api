const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')
const SelectFinanceChannelListID = require('../../model/Mysq/Select/SelectFinanceChannelList/SelectFinanceChannelListID')
const insertMemeberRecordTrade = require('../../model/Mysq/Insert/InsertMemberRecordTrade/InsertMemberRecordTrade')
const token_unique = require('../../utils/tokenAuth/tokenAuth')
const knex = require('../../utils/knex/config');
require('dotenv').config()

async function fetchSuitPayQrCode(ci, cs) {

}

async function FinanceThirdDeposit(token, body, res, timestampInSeconds) {
    let select_user_token = await SelectTokenUser(token)
     let gateways = await knex.table('gateways').where('id', 1).first();

    //  "state": 362, // payment confirm
    //   "state": 361, // payment await
    //    third_id get channel_list_id 
    if (select_user_token) {


        let deposit_amount = parseInt(body.amount)
        let third_id = parseInt(body.third_id)


        let select_finance_channel_list = await SelectFinanceChannelListID(third_id)

        let generation_id = await token_unique(27)

        //if (select_finance_channel_list.show_name === "SuitPay") {

        let data_insert_suitpay_payment = {
            "flag": 271,
            "ty": 1,
            "bill_no": generation_id,
            "platform_id": "0",
            "transfer_type": 1,
            "amount": deposit_amount,
            "created_at": timestampInSeconds,
            "state": 361,
            "remark": "",
            "username": select_user_token.username,
            "parent_name": select_user_token.parent_name,
            "balance": "0.00",
            "channel_id": select_finance_channel_list.id,
            "channel_name": "PIX",
            "pay_name": select_finance_channel_list.show_name,
            "real_name": "",
            "account": "",
            "updated_at": 0,
            "ramount": "0",
            "discount": "0"
        }
        console.log(data_insert_suitpay_payment)
        let insert_transaction_data = await insertMemeberRecordTrade(data_insert_suitpay_payment)

        if (insert_transaction_data === 1) {
            res.json({
                "status": true,
                "data": {
                    "id": generation_id,
                    "url": gateways['suitpay_payment_endpoint'] + "pay/suit?d=" + generation_id,
                    "useLink": "0",
                    "msg": ""
                }
            })
        }
        else {
            res.json({ "status": false, "data": "Error interno contate o suporte!" })
        }
        /* }
        else {
            res.json({ "status": false, "data": "Error interno contate o suporte!" })

        } */


    }
    else {
        res.json({ "status": false, "data": "Não Autenticado" })
    }

}

module.exports = FinanceThirdDeposit