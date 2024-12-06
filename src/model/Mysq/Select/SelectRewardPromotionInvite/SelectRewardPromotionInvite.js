const knex = require('../../../../utils/knex/config')

async function SelectRewardPromotionInvite(owner_username, mem_count)
{

    try {

        let reward = await knex('promotion_invite').select('*').where('owner_username', owner_username).andWhere('mem_count', mem_count).first()
        
        return reward
    } catch (error) {
        console.log('error SelectRewardPromotionInvite: ', error)

        return 100
    }

}

module.exports = SelectRewardPromotionInvite