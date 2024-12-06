const Login = require('../../core/Login/Login')

exports.login = async function (req,res)
{



    // login sucess = {"status":true,"data":"1000"}

    // login fail usernamne no exist = {"status":false,"data":"1009"}

    // login fail password incorrect or username = {"status":false,"data":"1303"}


    let body = req.body


    const login = await Login(body, res)

}