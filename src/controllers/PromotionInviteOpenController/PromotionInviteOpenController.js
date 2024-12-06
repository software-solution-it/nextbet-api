const PromotionInviteOpen = require('../../core/PromotionInviteOpen/PromotionInviteOpen')
const moment = require('moment-timezone');

exports.promotion_invite_open = async function (req, res) {

    const header_Token_auth = req.headers['t'];

    const parser_json_String_token = `{${header_Token_auth}}`

    const jsonString = parser_json_String_token
        .replace(/(\w+):/g, '"$1":')
        .replace(/:(\d+)/g, ':"$1"');

    const token_auth_object = JSON.parse(jsonString);

    const currentDate = new Date();

    const timestampInSeconds = moment.tz("America/Sao_Paulo").unix();

    const promotion_invite_open = await PromotionInviteOpen(token_auth_object.f90, req.body, res, timestampInSeconds)

}