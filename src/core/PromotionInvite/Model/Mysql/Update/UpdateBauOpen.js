const knex = require('../../../../../utils/knex/config')

async function UpdateBauOpen(id) {
    try {

        let data = await knex('promotion_invite').select("*").where('id', id).update("state", 2)

        return data



    } catch (error) {
        console.log('error ', error)

        return 0
    }

}


module.exports = UpdateBauOpen