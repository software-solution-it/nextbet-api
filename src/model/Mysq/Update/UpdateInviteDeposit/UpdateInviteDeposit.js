const knex = require('../../../../utils/knex/config')

async function UpdateInviteDeposit(deposit_amount, username)
{

    try {
        
        let data = await knex('promotion_invite_record').update({deposit_amount: deposit_amount}).where("username", username)

        return 1
    } catch (error) {
        console.log('error UpdateInviteDeposit: ', error)

        return 100
    }

}

module.exports = UpdateInviteDeposit