const knex = require('../../../utils/knex/config')

async function InsertUser(data)
{

  


    try {
        let user = await knex('users').insert(data)

        return {status: 1, id_insert: user}
    } catch (error) {
        console.log('error InsertUser : ', error)

        return 100
    }
}


module.exports = InsertUser