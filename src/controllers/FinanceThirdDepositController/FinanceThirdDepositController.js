const FinanceThirdDepositCore = require('../../core/FinanceThirdDeposit/FinanceThirdDeposit')
const moment = require('moment-timezone');


exports.finance_third = async function (req, res) {

    const header_Token_auth = req.headers['t'];

    const parser_json_String_token = `{${header_Token_auth}}`

    const jsonString = parser_json_String_token
        .replace(/(\w+):/g, '"$1":')
        .replace(/:(\d+)/g, ':"$1"');
    const token_auth_object = JSON.parse(jsonString);


    const body = req.body
    const currentDate = new Date();

    const timestampInSeconds = moment.tz("America/Sao_Paulo").unix();

    const Finance_third_deposit_core = await FinanceThirdDepositCore(token_auth_object.f90, body, res, timestampInSeconds)
}