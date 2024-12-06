const knex = require('../../../../utils/knex/config')

async function SelectDetailWithdrawMember(id, flag)
{

    try {

        let data = await knex('member_record_trade').select('*').where('id', id).andWhere('flag', flag)
        
        
        return data
    } catch (error) {
        console.log('error SelectDetailWithdrawMember: ', error)

        return 100
    }

}

module.exports = SelectDetailWithdrawMember