const knex = require('../../../../utils/knex/config')

async function SelectFinanceWithdrawProcessing()
{
    try {
        let data = await knex('finance_withdraw_processing').select('*')

        return data
    } catch (error) {
        console.log('error SelectFinanceWithdrawProcessing: ', error)
        return 100
    }

}

module.exports = SelectFinanceWithdrawProcessing