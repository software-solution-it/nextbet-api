const knex = require('../../../../utils/knex/config')

async function UpdateMemberCountPromotionInvite(token, mem_count)
{
    try {
        
        let update_member_count = await knex('users').update({mem_count: mem_count}).where('token_auth', token)

        return 1

    } catch (error) {
        console.log('error UpdateMemberCountPromotionInvite: ', error)
        return 100
    }

}

module.exports = UpdateMemberCountPromotionInvite