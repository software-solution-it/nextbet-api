const SelectUser = require('../../../../model/Mysq/SelectUser/SelectUser')
const SelectGamesAgregationKeysPragmatic = require('../../../../model/Mysq/Select/SelectGamesAgregationKeys/SelectGamesAgregationKeysPragmatic')


async function UserBalanceprag(body, res) {

    let obj_recebido = {
        agent_code: body.agent_code,
        agent_secret: body.agent_secret,
        user_code: body.user_code
    }


    const select_game_aggregation_keys = await SelectGamesAgregationKeysPragmatic()


    if (obj_recebido.agent_code === select_game_aggregation_keys.agentCode && obj_recebido.agent_secret === select_game_aggregation_keys.agentSecretKey) {

        let user = await SelectUser(obj_recebido.user_code, 'username')


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
    else {

        res.json({
            "status": 0,
            "user_balance": 0,
            "msg": "INTERNAL_ERROR"
        })
    }




}

module.exports = UserBalanceprag