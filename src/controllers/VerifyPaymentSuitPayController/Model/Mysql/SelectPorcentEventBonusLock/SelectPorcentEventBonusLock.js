const knex  = require('../../../../../utils/knex/config')

async function SelectPorcentEventBonusLock()
{

    try {
        
        let select_Data = await knex('promotion_bonus_config').select('*').first()

        return select_Data

    } catch (error) {
        console.log('error SelectPorcentEventBonusLock: ', error)
        return 100
    }

}

module.exports = SelectPorcentEventBonusLock