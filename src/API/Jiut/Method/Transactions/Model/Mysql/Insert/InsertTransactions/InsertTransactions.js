const knex = require('../../../../../../../../utils/knex/config')

async function InsertTransactions(data)
{

    try {
        
        let insert = await knex('member_record_game').insert(data)

        return 1
    } catch (error) {
        console.log('error InsertTransactions: ', error)

        return 100
    }

}

module.exports = InsertTransactions