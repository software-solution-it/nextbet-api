const knex = require('../../../../utils/knex/config')

async function InsertMemberRecordTrade(data)
{
    try 
    {
        let insert =  await knex('member_record_trade').insert(data)

        return 1
    } catch (error) {
        console.log('error InsertMemberRecordTrade: ', error)

        return 100
    }
}

module.exports = InsertMemberRecordTrade