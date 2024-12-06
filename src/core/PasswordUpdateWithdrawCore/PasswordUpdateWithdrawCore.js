const UpdateWithdrawPwd = require('../../model/Mysq/Update/UpdateWithdrawPwd/UpdateWithdrawPwd')
const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')

async function PasswordUpdateWithdrawCore(token, body, res)
{

    let select_user_token = await SelectTokenUser(token)

    if (select_user_token) 
    {
        

        let ty = parseInt(body.ty)

        let password = body.password

        let password_old = body.old_password


        if (password === password_old && ty === 2) {
            

            let update_pwd = await UpdateWithdrawPwd(password, select_user_token.username)


            if (update_pwd === 1) {
                res.json({"status":true,"data":"1000"})
            }
            else
            {
                res.json({"status":false,"data":"Error CODE 3000"})

            }

        }
        else
        {
            res.json({"status":false,"data":"Algo está errado reveja sua senha"})
        }

    }
    else
    {
        res.json({"status":false,"data":"Not Auth"})

    }

}

module.exports = PasswordUpdateWithdrawCore