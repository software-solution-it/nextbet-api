const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')


async function MemberRecallBalance(token, res)
{

    
    let select_user_token = await SelectTokenUser(token)

    if (select_user_token) {
        

        // let me


        res.json({"status":true,"data":"1000"})
    }
    else
    {

        res.json({"status":false,"data":"1062"})
    }

}


module.exports = MemberRecallBalance