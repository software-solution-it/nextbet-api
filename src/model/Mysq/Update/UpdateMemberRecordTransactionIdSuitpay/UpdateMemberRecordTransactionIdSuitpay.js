const knex = require('../../../../utils/knex/config')

async function UpdateMemberRecordTransactionIdSuitpay(bill_no, id_transaction)
{

    try {

        let data = await knex('member_record_trade').update({transaction_id_suitpay: id_transaction}).where('bill_no', bill_no)

        return 1
    } catch (error) {
        console.log('error UpdateMemberRecordTransactionIdSuitpay: ', error)
        return 100
    }

}

module.exports = UpdateMemberRecordTransactionIdSuitpay