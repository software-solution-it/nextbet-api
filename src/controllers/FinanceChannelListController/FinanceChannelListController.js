const FinanceChannelListCore = require('../../core/FinanceChannelList/FinanceChannelList')

exports.finance_channel_list = async function(req, res)
{
    const header_Token_auth = req.headers['t'];

    const parser_json_String_token = `{${header_Token_auth}}`

    const jsonString = parser_json_String_token
    .replace(/(\w+):/g, '"$1":')
    .replace(/:(\d+)/g, ':"$1"'); 

    const token_auth_object = JSON.parse(jsonString);

    const finance_channel_list = await FinanceChannelListCore(token_auth_object.f90,req.query,res)

}