const knex = require('../../../../utils/knex/config')

async function SelectFinanceChannelList(channel_type_id)
{

    try {

        let select_finance_channel_list = await knex('finance_channel_list').select('*').where('channel_type_id', channel_type_id)
        return select_finance_channel_list
        
    } catch (error) {
        console.log('error SelectFinanceChannelList: ', error)

        return 100
    }

}


module.exports = SelectFinanceChannelList