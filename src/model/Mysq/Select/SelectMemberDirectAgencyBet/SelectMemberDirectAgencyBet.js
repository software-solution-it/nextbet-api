const knex = require('../../../../utils/knex/config')

async function SelectMemberDirectAgencyBet(id)
{

    try {

        let select_member = await knex('promotion_invite_record').select('*').where('owner_inviter_id', id)


        return select_member
        
    } catch (error) {
        console.log('error SelectMemberDirectAgencyBet: ', error)

        return 100
    }

}

module.exports = SelectMemberDirectAgencyBet