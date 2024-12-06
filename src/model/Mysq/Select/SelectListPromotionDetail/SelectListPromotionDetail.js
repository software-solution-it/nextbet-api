const knex = require('../../../../utils/knex/config')

async function SelectListPromotionDetail(page, pageSize, flag, owner_id, userName )
{

    try {

        console.log(flag === 0  && userName === 0)

        if (flag === 0  && userName === 0) {
            const offset = (page - 1) * pageSize;

            const data = await knex('promotion_invite_record')
            .select('*')
            .limit(pageSize)
            .offset(offset)
            .where('owner_inviter_id', owner_id);
        
            return data
        }
        else if ( flag === 1  && userName === 0) // valid
        {
            const offset = (page - 1) * pageSize;

            const data = await knex('promotion_invite_record')
            .select('*')
            .limit(pageSize)
            .offset(offset)
            .where('owner_inviter_id', owner_id).andWhere('is_active', 1);
        
            return data
        }
        else if (flag === 2  && userName === 0) // invalid
        {
            const offset = (page - 1) * pageSize;

            const data = await knex('promotion_invite_record')
            .select('*')
            .limit(pageSize)
            .offset(offset)
            .where('owner_inviter_id', owner_id).andWhere('is_active', 0);
        
            return data
        }
        // else if (userName === 0) {
        //     // return {data: {"status":false,"data":"1252"}}
        // }
        else if(userName != 0)
        {
            const offset = (page - 1) * pageSize;

            const data = await knex('promotion_invite_record')
            .select('*')
            .limit(pageSize)
            .offset(offset)
            .where('owner_inviter_id', owner_id).andWhere('username', userName);
        
            return data
        }
    
        
    } catch (error) {
        console.log('error SelectListPromotionDetail: ', error)

        return 100
    }
}

module.exports = SelectListPromotionDetail