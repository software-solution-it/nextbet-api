const MemberLinkList = require('../../core/MemberLinkList/MemberLinkList')

exports.member_link_list = async function (req,res)
{

    const header_Token_auth = req.headers['t'];

    const parser_json_String_token = `{${header_Token_auth}}`

    const jsonString = parser_json_String_token
    .replace(/(\w+):/g, '"$1":')
    .replace(/:(\d+)/g, ':"$1"'); 

    const token_auth_object = JSON.parse(jsonString);

    // console.log('Objeto JSON:', token_auth_object.f90);

    const member_link_list = await MemberLinkList(token_auth_object.f90, res)
}