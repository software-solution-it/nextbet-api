const knex = require('../../../../utils/knex/config')

async function UpdateStateMemberTradeRecord(state, transaction_id_suitpay)
{
    try {
        
        let update=  await knex('member_record_trade').update({state: state}).where('transaction_id_suitpay', transaction_id_suitpay)

        return 1
    } catch (error) {
        console.log('error UpdateStateMemberTradeRecord: ', error)

        return 100
    }

}

module.exports = UpdateStateMemberTradeRecord