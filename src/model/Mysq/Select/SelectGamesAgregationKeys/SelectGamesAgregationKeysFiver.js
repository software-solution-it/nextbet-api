const knex = require('../../../../utils/knex/config')

async function SelectGamesAgregationKeysPlayFivers() {

    try {
        let data = await knex('games_aggregation_keys').select('*').where('id', 4).first()

        return data

    } catch (error) {
        console.log('error SelectGamesAgregationKeysPlayFivers: ', error)

        return 100
    }

}

module.exports = SelectGamesAgregationKeysPlayFivers