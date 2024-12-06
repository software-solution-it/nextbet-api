const knex = require('../../../../utils/knex/config')

async function SelectDepositSuitpayTransactionID(transaction_id_suitpay)
{


    try {

        let data = await knex('member_record_trade').select('*').where('transaction_id_suitpay', transaction_id_suitpay).first()

        
        return data
    } catch (error) {
        console.log('error SelectDepositSuitpayTransactionID: ', error)

        return 100
    }

}

module.exports = SelectDepositSuitpayTransactionID