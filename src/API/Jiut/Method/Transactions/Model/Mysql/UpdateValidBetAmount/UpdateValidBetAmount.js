const knex = require('../../../../../../../utils/knex/config')

async function UpdateValidBetAmount(bet_amount, username)
{
    try {
        
        let update_valid_Bet = await knex('promotion_invite_record').update({valid_bet_amount: bet_amount}).where('username', username)

        return 1
    } catch (error) {
        console.log('error UpdateValidBetAmount: ', error)

        return 100
    }

}

module.exports = UpdateValidBetAmount