const knex = require('../../../../utils/knex/config')

async function SelectMemberSlotListAll(plataform_id) {

    try {


        const data = await knex('list_games')
            .select('*')
            .where('platform_id', plataform_id)
            .andWhere('game_type', 3);

        return data


    } catch (error) {
        console.log("error SelectSlotHotGame: ", error)
        return 100
    }
}

module.exports = SelectMemberSlotListAll