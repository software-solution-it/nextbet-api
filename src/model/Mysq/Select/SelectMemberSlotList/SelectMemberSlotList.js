const knex = require('../../../../utils/knex/config')

async function SelectMemberSlotList(page, page_size, plataform_id) {

    try {

        const offset = (page - 1) * page_size;

        const data = await knex('list_games')
            .select('*')
            .limit(page_size)
            .offset(offset)
            .where('platform_id', plataform_id)
            .andWhere('game_type', 3);

        return data


    } catch (error) {
        console.log("error SelectSlotHotGame: ", error)
        return 100
    }
}

module.exports = SelectMemberSlotList