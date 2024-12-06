const knex = require('../../../../../../utils/knex/config')

async function SelectPromotionBonusConfig()
{

    try 
    {
        let data = await knex('promotion_bonus_config').select('*').first()
        
        return data
    } catch (error) {
        console.log('error SelectPromotionBonusConfig: ', error)
        return 100
    }

}


module.exports = SelectPromotionBonusConfig