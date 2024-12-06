const SuitPayCore = require('../../../core/PaymentGateways/SuitPay/SuitPay')

exports.suitpayController = async function (req, res) {
    const header_Token_auth = req.headers['t'];

    const parser_json_String_token = `{${header_Token_auth}}`

    const jsonString = parser_json_String_token
        .replace(/(\w+):/g, '"$1":')
        .replace(/:(\d+)/g, ':"$1"');

    const token_auth_object = JSON.parse(jsonString);


    const suitpay_core = await SuitPayCore(token_auth_object.f90, req.body, res)

}