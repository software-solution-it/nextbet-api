const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')
const SelectListPromotionDetail = require('../../model/Mysq/Select/SelectListPromotionDetail/SelectListPromotionDetail')
async function PromotionInviteRecordDetail(token, body, res) {


    // "channel_id": "218", primeiro deposito
    // "channel_id": "219", bau

    let select_user_token = await SelectTokenUser(token)

    if (select_user_token) {


        let page = body.page

        let page_size = body.page_size

        let flag = parseInt(body.flag)

        if (body.username !== undefined) {
            // A chave existe
            let username = body.username


            let get_list_promotion_detail_invite = await SelectListPromotionDetail(page, page_size, flag, select_user_token.id, username)

            let json_username_search = {
                "status": true,
                "data": {
                    "d": get_list_promotion_detail_invite,
                    "t": 1
                }
            }

            res.json(json_username_search)

        } else {


            let get_list_promotion_detail_invite = await SelectListPromotionDetail(page, page_size, flag, select_user_token.id, 0)

            console.log(get_list_promotion_detail_invite)


            let json_record_list = {
                "status": true,
                "data": {
                    "d": get_list_promotion_detail_invite,
                    "t": 5
                }
            }

            res.json(json_record_list)



        }
    }
    else {
        res.json({ "status": false, "data": "1062" })
    }

}

module.exports = PromotionInviteRecordDetail