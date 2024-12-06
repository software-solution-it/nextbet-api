const knex = require('../../../../utils/knex/config')

async function UpdateBalanceUser(token, reward)
{

    try 
    {
        let update_balance_user = await knex('users').update({balance: reward}).where('token_auth', token)

        return 1

    } catch (error) {
        console.log('error UpdateBalanceUser: ', error)

        return 100
    }
    

}

module.exports = UpdateBalanceUser