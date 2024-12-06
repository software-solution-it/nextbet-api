const knex = require('../../../../utils/knex/config')

async function SelectGamesAgregationKeysPg12() {

    try {
        let data = await knex('games_aggregation_keys').select('*').where('id', 1).first()

        return data

    } catch (error) {
        console.log('error SelectGamesAgregationKeys: ', error)

        return 100
    }

}

module.exports = SelectGamesAgregationKeysPg12