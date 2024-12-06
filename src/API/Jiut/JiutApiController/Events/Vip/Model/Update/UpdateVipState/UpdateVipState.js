const knex = require('../../../../../../../../utils/knex/config')

async function UpdateVipState(username, now_vip)
{

    try {
        let update_vip = await knex('users').update({now:now_vip }).where('username', username)

        return 1
    } catch (error) {
        console.log('error UpdateVipState: ', error)
        return 100
    }

}

module.exports = UpdateVipState