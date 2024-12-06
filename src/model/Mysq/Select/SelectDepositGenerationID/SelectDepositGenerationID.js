const knex = require('../../../../utils/knex/config')

async function SelectDepositGenerationID(bill_no)
{
    try {
        let data = await knex('member_record_trade').select('*').where('bill_no',bill_no).first()

        return data
    } catch (error) {
        console.log('error SelectDepositGenerationID: ', error)

        return 100
    }

}

module.exports = SelectDepositGenerationID