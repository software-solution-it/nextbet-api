const knex = require('../../../utils/knex/config')

async function SelectSearchGames(page, pageSize, game_type, pid) {
    try {
        const offset = (page - 1) * pageSize;

        const query = knex('list_games')
            .select('*')
            .offset(offset)
            .where('game_type', 3);

        if (pid > 0) {
            query.andWhere('platform_id', pid);
        }


        const data = await query;
        return data;

    } catch (error) {
        console.log('error select search games: ', error);
        return 100;
    }
}

module.exports = SelectSearchGames;
