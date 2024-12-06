const knex = require('../../../../../../utils/knex/config')

async function UpdateStateRewardBau(username, mem_count) {

    try {

        let update_state_reward = await knex('promotion_invite').update({ state: 3 }).where('owner_username', username).andWhere('mem_count', mem_count)

        return 1

    } catch (error) {
        console.log('error UpdateStateRewardBau: ', error)
    }

}

module.exports = UpdateStateRewardBau