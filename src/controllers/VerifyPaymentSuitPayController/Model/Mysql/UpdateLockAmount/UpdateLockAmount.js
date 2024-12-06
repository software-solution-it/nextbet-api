const knex = require('../../../../../utils/knex/config')

async function UpdateLockAmount(lock_amount, goal_luck, username)
{

    try 
    {
        
        let update = await knex('users').update({lock_amount: lock_amount, goal_luck: goal_luck}).where('username', username)

        return 1
        
    } catch (error) {
        console.log('error UpdateLockAmount: ', error)

        return 100
    }

}

module.exports = UpdateLockAmount