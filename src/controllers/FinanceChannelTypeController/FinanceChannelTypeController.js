const FinanceChannelTypeCore = require('../../core/FinanceChannelType/FinanceChannelType')

exports.finance_channel_type = async function(req, res)
{

    const header_Token_auth = req.headers['t'];

    const parser_json_String_token = `{${header_Token_auth}}`

    const jsonString = parser_json_String_token
    .replace(/(\w+):/g, '"$1":')
    .replace(/:(\d+)/g, ':"$1"'); 

    const token_auth_object = JSON.parse(jsonString);

    const finance_channel_type_core = await FinanceChannelTypeCore(token_auth_object.f90, res)

}