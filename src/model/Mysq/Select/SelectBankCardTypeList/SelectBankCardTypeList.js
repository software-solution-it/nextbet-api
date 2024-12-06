const knex = require('../../../../utils/knex/config')

async function SelectBankCardTypeList()
{


    try {

        let data = await knex('bank_card_pixtype_list').select('*')

        return data
        
    } catch (error) {
        console.log('error SelectBankCardTypeList: ', error)
        return 100
    }

}

module.exports = SelectBankCardTypeList