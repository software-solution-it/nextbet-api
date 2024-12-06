const knex = require('../../../../../utils/knex/config')

async function SelectListBauUsername(username)
{
    try {

            let list_bau = await knex('promotion_invite').select("*").where('owner_username',username)

            return list_bau

      
        
    } catch (error) {
        console.log('error ', error)

        return 0
    }

}


module.exports = SelectListBauUsername