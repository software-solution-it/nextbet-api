const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')
const SelectMemberRecordGame = require('../../model/Mysq/Select/SelectMemberRecordGame/SelectMemberRecordGame')

async function MemberRecordGameCore(token, body, res)
{

    let select_user_token = await SelectTokenUser(token)

    if (select_user_token) {
        const page = body.page
        const page_size = body.page_size
        const start_time = body.start_time
        const end_time = body.end_time
        
        let select_member_record_game = await SelectMemberRecordGame(page, page_size, select_user_token.username, start_time, end_time )


        let data_res_record_game = {
            "status": true,
            "data": {
                "t": 262,
                "d": select_member_record_game,
                "agg": {
                    "net_amount": 0,
                    "valid_bet_amount": 0,
                    "bet_amount": 0,
                    "rebate_amount": 0
                }
            }
        }

        res.json(data_res_record_game)
    }
    else
    {
        res.json({"status":false,"data":"Not Auth"})
    }

}

module.exports = MemberRecordGameCore