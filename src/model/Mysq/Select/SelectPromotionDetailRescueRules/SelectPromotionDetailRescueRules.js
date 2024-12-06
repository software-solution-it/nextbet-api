const knex = require('../../../../utils/knex/config')

async function SelectPromotionDetailRescueRules()
{

    try {

        let data = await knex('promotion_rescue_rules').select('*')

        return data
        
    } catch (error) {
        console.log('error SelectPromotionDetailRescueRules: ', error)

        return 100
    }


}

module.exports = SelectPromotionDetailRescueRules