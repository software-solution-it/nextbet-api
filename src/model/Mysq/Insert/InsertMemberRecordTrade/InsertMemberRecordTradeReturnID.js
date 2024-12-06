const knex = require('../../../../utils/knex/config')

async function InsertMemberRecordTradeReturnID(data)
{
    try 
    {
        let insert =  await knex('member_record_trade').insert(data)

        return insert
    } catch (error) {
        console.log('error InsertMemberRecordTradeReturnID: ', error)

        return 100
    }
}

module.exports = InsertMemberRecordTradeReturnID