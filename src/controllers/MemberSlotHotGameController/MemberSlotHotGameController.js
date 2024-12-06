const SelectSlotHotGame = require('../../model/Mysq/Select/SelectSlotHotGame/SelectSlotHotGame')

exports.slot_hot_Game = async function (req, res) {

    let hot_Game = await SelectSlotHotGame(req.query.page, req.query.page_size)

    if (hot_Game) {
        res.json({
            "status": true,
            "data": {
                "d": hot_Game,
                "t": hot_Game.length
            }
        })
    } else {
        res.json({ "status": false, "data": "Error contate admin" })
    }

}