const knex = require('../../../../utils/knex/config')

async function SelectFinanceChannelListID(id)
{

    try {
        
        let data = await knex('finance_channel_list').select('*').where('id', id).first()

        return data



    } catch (error) {
        console.log('error SelectFinanceChannelListID: ', error)

        return 100
    }

}


module.exports = SelectFinanceChannelListID