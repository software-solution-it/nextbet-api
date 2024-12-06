const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')


async function MemberPasswordCheckCore(token, res) {

    let select_user_token = await SelectTokenUser(token)

    if (select_user_token) {


        if (select_user_token.withdraw_pwd === 0) {
            res.json({ "status": true, "data": "1249" })
        }
        else {
            res.json({ "status": true, "data": "1000" })
        }

    }
    else {

        res.json({ "status": false, "data": "Não autenticado" }
        )
    }


}

module.exports = MemberPasswordCheckCore