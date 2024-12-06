const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')
const SelectListMemberRecordTrade = require('../../model/Mysq/Select/SelectMemberRecordTrade/SelectMemberRecordTrade')

async function MemberRecordTrade(token, body, res)
{

    let select_user_token = await SelectTokenUser(token)

    if (select_user_token) {
        
        // console.log(body)
        let flag = parseInt(body.flag)

        let page = body.page

        let page_size = body.page_size

        let start_time = body.start_time

        let end_time = body.end_time

        if (flag === 274) {
            
        let select_list_member_record_trade = await SelectListMemberRecordTrade(page, page_size, flag, select_user_token.username, start_time, end_time)


        let response_list_record_Trade = {
            "status": true,
            "data": {
                "t": 1,
                "d": select_list_member_record_trade,
                "s": 0,
                "agg": {
                    "amount": "10.00"
                }
            }
        }

        res.json(response_list_record_Trade)
        }
        else if (flag === 271) {
            let select_list_member_record_trade = await SelectListMemberRecordTrade(page, page_size, flag, select_user_token.username, start_time, end_time)

            console.log(select_list_member_record_trade)
            let response_list_record_Trade = {
                "status": true,
                "data": {
                    "t": 3,
                    "d": select_list_member_record_trade,
                    "s": 0,
                    "agg": null
                }
            }
    
            res.json(response_list_record_Trade)
        }

        else if (flag === 272) {
            let select_list_member_record_trade = await SelectListMemberRecordTrade(page, page_size, flag, select_user_token.username, start_time, end_time)

            console.log(select_list_member_record_trade)
            let response_list_record_Trade = {
                "status": true,
                "data": {
                    "t": 2,
                    "d": select_list_member_record_trade,
                    "s": 0,
                    "agg": null
                }
            }
    
            res.json(response_list_record_Trade)
        }

        else
        {
            let response_list_record_Trade = {
                "status": true,
                "data": {
                    "t": 2,
                    "d": null,
                    "s": 0,
                    "agg": null
                }
            }
    
            res.json(response_list_record_Trade)
        }

    }
    else
    {
        res.json({"status":false,"data":"Contate o suporte"})
    }        

}

module.exports = MemberRecordTrade