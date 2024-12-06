const SelectUser = require('../../../../model/Mysq/SelectUser/SelectUser')
const SelectGamesAgregationKeys = require('../../../../model/Mysq/Select/SelectGamesAgregationKeys/SelectGamesAgregationKeys')

exports.userbalancegold = async function (req, res) {
    const body = req.body;
    let user = await SelectUser(body.user_code, 'username')


    if (user) {
        // console.log(user)
        res.json({
            "status": 1, // Should return even though user_balance is 0
            "user_balance": user.balance
        })
    }
    else {

        res.json({
            "status": 0,
            "user_balance": 0,
            "msg": "INTERNAL_ERROR"
        })
    }


}
