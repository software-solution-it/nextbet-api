const knex = require('../../../../utils/knex/config')


async function SelectPromotionTotalMemberValidCount(deposit_limit, valid_bet_amount, id) {

    try {

        let data = await knex('promotion_invite_record').select('*').where('deposit_amount', '>=', deposit_limit).andWhere('valid_bet_amount', '>=', valid_bet_amount).andWhere('is_active', 1).andWhere('owner_inviter_id', id).count('* as total');


        return data[0].total;


    } catch (error) {
        console.log('error SelectPromotionTotalMemberValidCount: ', error)
    }

}

module.exports = SelectPromotionTotalMemberValidCount