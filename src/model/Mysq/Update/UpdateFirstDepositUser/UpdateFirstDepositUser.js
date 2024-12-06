const knex = require('../../../../utils/knex/config')

async function UpdateFirstDepositUser(first_deposit_amount, first_deposit_at, username)
{

    try {

        let update = await knex('users').update({first_deposit_amount: first_deposit_amount, first_deposit_at: first_deposit_at}).where('username', username)

        return 1
    } catch (error) {
        console.log('error UpdateFirstDepositUser: ', error)

        return 100
    }

}

module.exports = UpdateFirstDepositUser