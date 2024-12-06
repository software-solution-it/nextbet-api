const knex  = require('../../../../../utils/knex/config')

async function SelectBankCardListUser(id_user)
{

    try {

        let data = await knex('member_bank_card').select('*').where('uid', id_user)
        
        return data
    } catch (error) {
        console.log('error SelectBankCardListUser: ', error)

        return 100
    }

}


module.exports = SelectBankCardListUser
