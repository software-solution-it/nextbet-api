const SearchGames = require('../../model/Mysq/SelectSearchGames/SelectSearchGames')

async function SlotsSearchMember(body, res) {

    let page_size = body.page_size

    let page = body.page

    let game_type = body.game_type

    let pid = body.pid

    let search_Games = await SearchGames(page, page_size, game_type, pid)

    if (search_Games) {
        const json_all_games = {

            "status": true,
            "data": {
                "d": search_Games,
                "t": search_Games.length
            }

        }
        res.json(json_all_games)
    }

}

module.exports = SlotsSearchMember