const knex = require('../../../../utils/knex/config')

async function UpdateBalanceUserByUsername(new_balance, username)
{

    try {

        let data = await knex('users').update({balance: new_balance}).where('username', username)

        return 1
        
    } catch (error) {
        console.log('error UpdateBalanceUserByUsername: ', error)

        return 100
    }

}

module.exports = UpdateBalanceUserByUsername