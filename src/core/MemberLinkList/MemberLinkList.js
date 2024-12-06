const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')


async function MemberLinkList(token, res)
{

    let select_user_token = await SelectTokenUser(token)

    if (select_user_token) {

        const response_json_member_list = {
            "status": true,
            "data": [
                {
                    "id": select_user_token.id,
                    "uid": select_user_token.id,
                    "username": select_user_token.username,
                    "short_url": "id="+select_user_token.id,
                    "code": select_user_token.id,
                    "prefix": "",
                    "created_at": "",
                    "tester": ""
                }
            ]
        }

        res.json(response_json_member_list)

    }
    else
    {

        res.json({"status":false,"data":"1062"}
        )
    }

}

module.exports = MemberLinkList