const SelectMemberSlotList = require('../../model/Mysq/Select/SelectMemberSlotList/SelectMemberSlotList')
const SelectMemberSlotListAll = require('../../model/Mysq/Select/SelectMemberSlotList/SelectMemberSlotListAll')

exports.member_slot_list = async function (req, res) {

    let body = req.query

    let page = body.page

    let page_size = body.page_size

    let plataform_id = body.pid


    let list_Games = await SelectMemberSlotList(page, page_size, plataform_id)
    let list_GamesAll = await SelectMemberSlotListAll(plataform_id)

    if (list_Games) {
        res.json({
            "status": true,
            "data": {
                "d": list_Games,
                "t": list_GamesAll.length
            }
        })
    } else {
        res.json({ "status": false, "data": "Error contate admin" })

    }

}