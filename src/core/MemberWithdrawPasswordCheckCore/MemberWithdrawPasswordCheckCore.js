const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')

async function MemberWithdrawPasswordCheckCore(token, body, res)
{


         
    let select_user_token = await SelectTokenUser(token)

    if (select_user_token) {
        
        let password_withdraw = parseInt( body.password)

        if (password_withdraw === select_user_token.withdraw_pwd) 
        {
            
            
            res.json({"status":true,"data":"1000"})
        }
        else
        {
            res.json({"status":false,"data":"1251"})
        }
    }
    else
    {
        res.json({"status":false,"data":"Fail Auth"})
    }

}

module.exports = MemberWithdrawPasswordCheckCore