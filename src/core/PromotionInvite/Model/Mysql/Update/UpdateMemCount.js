const knex = require('../../../../../utils/knex/config')

async function UpdateMemCountbyid(id, memcount) {
    try {

        let data = await knex('users').select("*").where('id', id).update("mem_count", memcount)

        return data



    } catch (error) {
        console.log('error ', error)

        return 0
    }

}


module.exports = UpdateMemCountbyid