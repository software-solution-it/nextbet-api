const knex = require('../../../../utils/knex/config')

async function SelectFInanceChannelType(id,id_channel_type)
{

    try {

        if (id === "no") {
            let data = await knex('finance_channel_type').select('*')

            return data
        }
        else if (id === 1) {
            let data = await knex('finance_channel_type').select('*').where('id', id_channel_type).first()

            return data
        }
        
 
    } catch (error) {
        console.log('error SelectFInanceChannelType: ', error)
        return 100
    }

}

module.exports = SelectFInanceChannelType