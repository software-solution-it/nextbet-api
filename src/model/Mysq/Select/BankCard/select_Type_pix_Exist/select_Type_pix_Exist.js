const knex = require('../../../../../utils/knex/config')

async function select_Type_pix_Exist(id_user, ty)
{


    try {

        let data = await knex('member_bank_card').select('*').where('uid', id_user).andWhere('ty', ty).first()
        
        return data
    } catch (error) {
        console.log('error SelectExistChavePixPayment: ', error)

        return 100
    }

}


module.exports = select_Type_pix_Exist