const knex = require('../../../../utils/knex/config')

async function InsertPromotionInviteRecord(data)
{

    try {
        
        let insert_record_promotion_invite = await knex('promotion_invite_record').insert(data)

        return 1
    } catch (error) {
        console.log('error InsertPromotionInviteRecord :', error)

        return 100
    }

}


module.exports = InsertPromotionInviteRecord