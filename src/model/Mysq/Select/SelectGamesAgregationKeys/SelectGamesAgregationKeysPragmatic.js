const knex = require('../../../../utils/knex/config')

async function SelectGamesAgregationKeysPragmatic() {

    try {
        let data = await knex('games_aggregation_keys').select('*').where('id', 3).first()

        return data

    } catch (error) {
        console.log('error SelectGamesAgregationKeys: ', error)

        return 100
    }

}

module.exports = SelectGamesAgregationKeysPragmatic