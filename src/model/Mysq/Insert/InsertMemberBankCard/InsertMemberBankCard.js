const knex = require('../../../../utils/knex/config')

async function InsertMemberBankCard(data)
{

    try 
    {
        let insert = await knex('member_bank_card').insert(data)
        
        return 1
    } 
    catch (error) {
        console.log('error InsertMemberBankCard: ', error)
        return 100
    }

}

module.exports = InsertMemberBankCard