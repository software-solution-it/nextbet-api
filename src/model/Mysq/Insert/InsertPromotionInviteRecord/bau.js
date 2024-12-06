const knex = require('../../../../utils/knex/config')

async function baux(data) {

    try {

        let insert_record_promotion_invite = await knex('promotion_invite').insert(data)

        return insert_record_promotion_invite
    } catch (error) {
        console.log('error baux :', error)

        return 100
    }

}


module.exports = baux