const knex = require('../../../../utils/knex/config')


async function SelectHistoryGameRecent (username)
{

    try {
        let data = await knex('launcher_game_history').where('username', username)

        return data
    } catch (error) {
        console.log('error SelectHistoryGameRecent', error)
    }

}

module.exports = SelectHistoryGameRecent