const UserBalancefive = require('../Method/UserBalance/UserBalancefive')
const Transactionfive = require('../Method/Transactions/Transactionfive')

exports.playfiver = async function (req, res) {

    const body = req.body

    // console.log(body)

    const method = body.method


    if (method === "user_balance") {

        await UserBalancefive(body, res)
    }

    else if (method === "transaction") {

        await Transactionfive(body, res)

    }

}