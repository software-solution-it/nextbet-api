const knex = require('../../../../utils/knex/config')

async function SelectFirstDepositRules(deposit_amount)
{
    try {

        let data = await knex('promotion_deposit_rules').select('*').where('deposit_amount', deposit_amount).first()

        return data

        
    } catch (error) {
        console.log('error SelectFirstDepositRules: ', error)
        return 100
    }

}

module.exports = SelectFirstDepositRules