const knex  = require('../../../../../utils/knex/config')

async function SelectExistChavePixPayment(bank_card)
{

    try {

        let data = await knex('member_bank_card').select('*').where('bank_card', bank_card).first()
        
        return data
    } catch (error) {
        console.log('error SelectExistChavePixPayment: ', error)

        return 100
    }

}


module.exports = SelectExistChavePixPayment
