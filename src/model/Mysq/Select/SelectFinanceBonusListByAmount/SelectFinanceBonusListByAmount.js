const knex = require('../../../../utils/knex/config')

async function SelectFinanceBonusListByAmount(bonus_amount)
{

    try {

        let data = await knex('finance_channel_bonus_list').select('*').where('deposit_amount', bonus_amount).first()

        return data

        
    } catch (error) {
        console.log('error SelectFirstDepositRules: ', error)
        return 100
    }

}

module.exports = SelectFinanceBonusListByAmount