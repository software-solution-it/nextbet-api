const SelectTokenUser = require('../../../../model/Mysq/SelectTokenUser/SelectTokenUser')
const SelectPromotionBonusConfig = require('../../Model/Mysql/Select/SelectPromotionBonusConfig/SelectPromotionBonusConfig')

async function MemberEventWalletLockBonusCore(token, res)
{

    let select_token_user = await SelectTokenUser(token)


    if (select_token_user) {

        let select_promotion_bonus_config = await SelectPromotionBonusConfig()

        console.log(select_promotion_bonus_config)

        let json_config_data = {
            title: select_promotion_bonus_config.title,
            condition_event: select_promotion_bonus_config.condition_event,
            rules_event_text: select_promotion_bonus_config.rules_event_text
        }
        res.json({status:true, data: json_config_data})
    } else {
        res.json({ "status": false, "data": "Não Autenticado" });

    }
}

module.exports = MemberEventWalletLockBonusCore