const knex = require('../../../../utils/knex/config')

async function SelectMemberStatePendenteWithdraw(username)
{

    try {

        let data = await knex('member_record_trade').select('*').where('state', 373).andWhere('username', username).first()
        
        return data
    } catch (error) {
        console.log('error SelectMemberStatePendenteWithdraw: ', SelectMemberStatePendenteWithdraw)
        return 100
    }

}

module.exports = SelectMemberStatePendenteWithdraw