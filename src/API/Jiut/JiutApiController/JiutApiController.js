const UserBalanceprag = require('../Method/UserBalance/UserBalanceprag')
const Transactionsprag = require('../Method/Transactions/Transactionsprag')

exports.jiut_api = async function (req, res) {

    const body = req.body


    const type = body.type


    if (type === "BALANCE") {

        await UserBalanceprag(body, res)
    }

    else if (type === "WinBet") {

        await Transactionsprag(body, res)

    }

}