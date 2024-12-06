const knex = require('../../../../utils/knex/config')

async function InsertPromotionRewardRecord(data)
{

    try {

        let insert_reward_record = await knex('promotion_reward_record').insert(data)
        
        return 1
    } catch (error) {
        console.log('error InsertPromotionRewardRecord: ', error)
        return 100
    }

}

module.exports = InsertPromotionRewardRecord