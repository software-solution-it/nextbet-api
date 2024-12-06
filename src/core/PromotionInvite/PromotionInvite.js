const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')
const selectPromotionInvite = require('../../model/Mysq/SelectPromotionInviteConfig/SelectPromotionInviteConfig')
const ListPromotionInvite = require('../../model/Mysq/SelectListPromotionsInvite/SelectListPromotionsInvite')
const SelectPromotionTotalMemberValidCount = require('../../model/Mysq/Select/SelectPromotionTotalMemberValidCount/SelectPromotionTotalMemberValidCount')
const SelectListBauUsername = require('./Model/Mysql/Select/SelectListBauUsername')
const UpdateMemCountbyid = require('./Model/Mysql/Update/UpdateMemCount')
const UpdateBauOpen = require('./Model/Mysql/Update/UpdateBauOpen')

async function PromotionInvite(token, res) {


    let select_user_token = await SelectTokenUser(token)

    if (select_user_token) {


        let global_invite_config = select_user_token.promotion_invite_global === 1 ? 0 : select_user_token.id

        const select_promotion_invite = await selectPromotionInvite(global_invite_config)

        const config_promotion_invite_deposit_limit = select_promotion_invite.deposit_limit

        const config_promotion_invite_valid_bet_amount = select_promotion_invite.valid_bet_amount


        const total_mem_valid_count = await SelectPromotionTotalMemberValidCount(config_promotion_invite_deposit_limit, config_promotion_invite_valid_bet_amount, select_user_token.id)
        await UpdateMemCountbyid(select_user_token.id, total_mem_valid_count)

        const confirmed_member_count = select_user_token.mem_count
        console.log('member valid count ', total_mem_valid_count)
        console.log('confirmed_member_count ', confirmed_member_count)


        const select_list_promotion_invite = await ListPromotionInvite(select_user_token.username)

        // console.log('select_list_promotion_invite ', select_list_promotion_invite)
        select_list_promotion_invite.forEach(async item => {
            if (confirmed_member_count >= item.mem_count && item.state == 1) {
                await UpdateBauOpen(item.id)
            }
        });
        // select_list_promotion_invite.forEach(item => {
        //     if (confirmed_member_count < item.mem_count && item.mem_count <= total_mem_valid_count) {
        //         item.state = 2;
        //     } else if (confirmed_member_count === item.mem_count || confirmed_member_count >= item.mem_count) {
        //         item.state = 3;
        //     }
        // });

        const promotion_response = {
            "status": true,
            "data": {
                "list": await SelectListBauUsername(select_user_token.username),
                "total_mem_count": total_mem_valid_count,
                "deposit_limit": select_promotion_invite.deposit_limit,
                "valid_bet_amount": select_promotion_invite.valid_bet_amount,
                "title": select_promotion_invite.title,
                "promo_content_json": [
                    {
                        "title": "222",
                        "content": "33333"
                    }
                ],
                "promo_rule_json": [
                    {
                        "content": "Somente o subordinado recem-registrado,os subordinados atendem aos requisitos de atividade e concluir Configure o metodo de retirada."
                    },
                    {
                        "content": "Recomende amigos e ganhe bônus。Convidar diferentes números de amigos pode gerar bônus correspondentes. O número máximo de amigos convidados é 50.000. Quanto mais você convidar, maior será uma recompensa."
                    },
                    {
                        "content": "Esta atividade é um presente extra da plataforma, você pode desfrutar de outras recompensas e comissões de agentes ao mesmo tempo e desfrutar de múltiplas alegrias."
                    },
                    {
                        "content": "As recompensas incluem coleta manual em IOS, Android, H5 e PC e serão reabastecidas automaticamente durante a transição."
                    },
                    {
                        "content": "Esta atividade está limitada às operações normais dos correntistas. É proibido o leasing, a utilização de plug-ins, as apostas com contas diferentes, a escovagem mútua, a exploração de lacunas e outros meios técnicos. Caso contrário, as recompensas serão canceladas ou deduzidas, a conta será congelada ou mesmo colocada na lista negra."
                    },
                    {
                        "content": "Para evitar diferenças na compreensão do texto, a plataforma reserva-se o direito de interpretação final deste evento."
                    }
                ]
            }
        }

        res.json(promotion_response)
    }
    else {

        res.json({ "status": false, "data": "Fail Auth" }
        )
    }

}

module.exports = PromotionInvite