const knex = require('../../../../utils/knex/config')

async function selectPromotionDetailDepositRules()
{

    try {

        let data = await knex('promotion_deposit_rules').select('*')

        return data
        
    } catch (error) {
        console.log('error selectPromotionDetailDepositRules: ', error)

        return 100
    }


}

module.exports = selectPromotionDetailDepositRules