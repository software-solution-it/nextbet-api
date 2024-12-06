const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')
const SelectDetailWithdrawMember = require('../../model/Mysq/Select/SelectDetailWithdrawMember/SelectDetailWithdrawMember')


async function MemberRecordWithdrawDetailCore(token, body, res)
{

    
    let select_user_token = await SelectTokenUser(token)

    if (select_user_token) {
        let flag = parseInt(body.flag)

        let id = parseInt(body.id)


        const select_detail_withdraw = await SelectDetailWithdrawMember(id, flag)


        if (select_detail_withdraw) 
        {
            let data_response = {
                "status": true,
                "data": {
                    "t": 1,
                    "d": select_detail_withdraw,
                    "s": 0,
                    "agg": null
                }
            }

            res.json(data_response)
        }
        else
        {
        res.json({"status":false,"data":"Error code 5621"})

        }

    }
    else
    {
        res.json({"status":false,"data":"No Auth"})
    }

}

module.exports = MemberRecordWithdrawDetailCore