const knex = require('../../../utils/knex/config')

async function SelectPromotionInviteConfig(user_id)
{
    try {
        if (user_id === 0) 
        {
            let config_global = await knex('promotion_invite_config').select('*').where('user_id', user_id).first()

            return config_global
        }
        else
        {
            let config_unique_user = await knex('promotion_invite_config').where('user_id', user_id).first()

            return config_unique_user
        }
    } catch (error) {
        console.log('error SelectPromotionInviteConfig: ', error)
        return 0
    }

}


module.exports = SelectPromotionInviteConfig