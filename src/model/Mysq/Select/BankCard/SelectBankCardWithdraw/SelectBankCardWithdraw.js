const knex  = require('../../../../../utils/knex/config')

async function SelectBankCardWithdraw(id_user, bank_card_id)
{

    try {

        let data = await knex('member_bank_card').select('*').where('uid', id_user).andWhere('id', bank_card_id).first()
        
        return data
    } catch (error) {
        console.log('error SelectBankCardWithdraw: ', error)

        return 100
    }

}


module.exports = SelectBankCardWithdraw
