const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')
const UpdateMemberCountPromotionInvite = require('../../model/Mysq/Update/UpdateMemberCountPromotionInvite/UpdateMemberCountPromotionInvite')
const SelectPromotionTotalMemberValidCount = require('../../model/Mysq/Select/SelectPromotionTotalMemberValidCount/SelectPromotionTotalMemberValidCount')
const selectPromotionInvite = require('../../model/Mysq/SelectPromotionInviteConfig/SelectPromotionInviteConfig')
const SelectRewardPromotionInvite = require('../../model/Mysq/Select/SelectRewardPromotionInvite/SelectRewardPromotionInvite')
const UpdateBalanceUserReward = require('../../model/Mysq/Update/UpdateBalanceUser/UpdateBalanceUser')
const InsertPromotionRewardRecord = require('../../model/Mysq/Insert/InsertPromotionRewardRecord/InsertPromotionRewardRecord')
const UpdateStateRewardBau = require('./Model/Mysql/Update/UpdateStateRewardBau/UpdateStateRewardBau')
const generate_unique_token = require('../../utils/tokenAuth/tokenAuth')
async function PromotionInviteOpen(token, body, res, timestampInSeconds) {
    // sucess open bau {"status":true,"data":"1000"}

    const mem_count = parseInt(body.mem_count)

    let select_user_token = await SelectTokenUser(token)

    if (select_user_token) {
        let global_invite_config = select_user_token.promotion_invite_global === 1 ? 0 : select_user_token.id

        const select_promotion_invite = await selectPromotionInvite(global_invite_config)




        // console.log('total_mem_valid_count ', total_mem_valid_count)
        // console.log('mem_count ', mem_count)







        let reward_promotion_inviter_per_mem_count = await SelectRewardPromotionInvite(select_user_token.username, mem_count)

        if (reward_promotion_inviter_per_mem_count) {
            if (reward_promotion_inviter_per_mem_count.state === 2) {
                let new_balance = select_user_token.balance + reward_promotion_inviter_per_mem_count.bonus_amount

                let insert_reward_record_data = {
                    "flag": 274,
                    "ty": 1,
                    "bill_no": await generate_unique_token(),
                    "platform_id": "",
                    "transfer_type": 105,
                    "amount": reward_promotion_inviter_per_mem_count.bonus_amount,
                    "created_at": timestampInSeconds,
                    "state": 232,
                    "remark": select_promotion_invite.title,
                    "username": select_user_token.username,
                    "parent_name": select_user_token.parent_name,
                    "balance": "0.0000",
                    "channel_id": "219",
                    "channel_name": "",
                    "pay_name": "",
                    "real_name": "",
                    "account": "",
                    "updated_at": 0,
                    "ramount": "",
                    "discount": ""
                }
                let insert_reward_record = await InsertPromotionRewardRecord(insert_reward_record_data)
                console.log(new_balance)

                if (insert_reward_record === 1) {

                    let update_state_reward = await UpdateStateRewardBau(select_user_token.username, mem_count)

                    if (update_state_reward) {
                        let update_reward_balance = await UpdateBalanceUserReward(token, new_balance)

                        if (update_reward_balance === 1) {
                            res.json({ "status": true, "data": "1000" })
                        }
                        else {
                            res.json({ "status": false, "data": "Contate o suporte" })

                        }
                    }
                    else {
                        res.json({ "status": false, "data": "Contate o suporte" })

                    }


                }
            }
            else {
                res.json({ "status": false, "data": "Contate o suporte" })

            }


        }
        else {
            res.json({ "status": false, "data": "Contate o suporte" })

        }











    }
    else {

        res.json({ "status": false, "data": "1062" }
        )
    }
}

module.exports = PromotionInviteOpen