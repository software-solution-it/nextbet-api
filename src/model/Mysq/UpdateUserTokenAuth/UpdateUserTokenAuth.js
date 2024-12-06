const knex = require('../../../utils/knex/config')

async function UpdateUserTokenAuth(token, email)
{

  


    try {
        let user = await knex('users').update({token_auth:token}).where('email', email)

        return 1
    } catch (error) {
        console.log('error UpdateUserTokenAuth : ', error)

        return 100
    }
}


module.exports = UpdateUserTokenAuth