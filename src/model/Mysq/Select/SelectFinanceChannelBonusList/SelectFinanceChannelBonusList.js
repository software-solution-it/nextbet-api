const knex = require('../../../../utils/knex/config')

async function SelectFinanceChannelBonusList()
{

    try {
        let data = await knex('finance_channel_bonus_list').select('*')

        return data
        
    } catch (error) {
        console.log('error SelectFinanceChannelBonusList: ', error)

        return 100
    }

}

module.exports = SelectFinanceChannelBonusList