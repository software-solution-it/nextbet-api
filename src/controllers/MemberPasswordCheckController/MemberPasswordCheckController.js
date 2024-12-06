const MemberPasswordCheckCore = require('../../core/MemberPasswordCheckCore/MemberPasswordCheckCore')

exports.member_password_check = async function(req, res)
{
    const header_Token_auth = req.headers['t'];

    const parser_json_String_token = `{${header_Token_auth}}`

    const jsonString = parser_json_String_token
    .replace(/(\w+):/g, '"$1":')
    .replace(/:(\d+)/g, ':"$1"'); 

    const token_auth_object = JSON.parse(jsonString);

    const member_password_check_core = await MemberPasswordCheckCore(token_auth_object.f90, res)


}