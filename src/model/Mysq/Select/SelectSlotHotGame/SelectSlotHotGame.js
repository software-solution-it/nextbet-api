const knex = require('../../../../utils/knex/config')

async function SelectSlotHotGame(page, page_size) {

    try {

        const offset = (page - 1) * page_size;

        const data = await knex('list_games')
            .select('*')
            .limit(page_size)
            .offset(offset)
            .where('is_hot', 1);
        //.andWhere('game_type', 3);

        return data


    } catch (error) {
        console.log("error SelectSlotHotGame: ", error)
        return 100
    }
}

module.exports = SelectSlotHotGame