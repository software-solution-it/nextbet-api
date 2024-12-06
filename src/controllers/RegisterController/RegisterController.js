const Register = require('../../core/Register/Register')
const moment = require('moment-timezone');

exports.register = async function (req, res) {

    let body = req.body

    // response sucess create {"status":true,"data":"1000"}

    // response fail exist user create  {"status":false,"data":"1062"}

    // tenho que salvar um id code com prexi f90:id envia no response example: Id:f90:2337902809401443
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const timestampInSeconds = moment.tz("America/Sao_Paulo").unix();

    const register_core = await Register(body, ip, timestampInSeconds, res)


     return register_core

}