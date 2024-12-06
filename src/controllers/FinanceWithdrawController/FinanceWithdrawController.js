const FinanceWithdrawCore = require('../../core/FinanceWithdrawCore/FinanceWithdrawCore')
const moment = require('moment-timezone');

exports.finance_withdraw_controller = async function (req, res) {
    const header_Token_auth = req.headers['t'];

    const parser_json_String_token = `{${header_Token_auth}}`

    const jsonString = parser_json_String_token
        .replace(/(\w+):/g, '"$1":')
        .replace(/:(\d+)/g, ':"$1"');

    const token_auth_object = JSON.parse(jsonString);

    const timestampInSeconds = moment.tz("America/Sao_Paulo").unix();


    const finance_withdraw_core = await FinanceWithdrawCore(token_auth_object.f90, req.body, res, timestampInSeconds)

}