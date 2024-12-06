const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')

async function InfoUserMember(token, res)
{
    
    let select_user_token = await SelectTokenUser(token)

    if (select_user_token) {
        

        let infoUser = {
            "status": true,
            "data": {
                "uid": select_user_token.id,
                "username": select_user_token.username,
                "password": "0",
                "birth": "0",
                "realname": select_user_token.realname,
                "email": select_user_token.email,
                "phone": select_user_token.phone,
                "zalo": select_user_token.zalo,
                "prefix": "f90",
                "tester": "1",
                "withdraw_pwd": 123123123,
                "regip": select_user_token.regip,
                "reg_device": select_user_token.reg_device,
                "reg_url": select_user_token.reg_url,
                "created_at": select_user_token.created_at,
                "last_login_ip": select_user_token.last_login_ip,
                "last_login_at": select_user_token.last_login_at,
                "source_id": 1,
                "first_deposit_at": select_user_token.first_deposit_at,
                "first_deposit_amount": select_user_token.first_deposit_amount,
                "first_bet_at": select_user_token.first_bet_at,
                "first_bet_amount": select_user_token.first_bet_amount,
                "second_deposit_at": select_user_token.second_deposit_at,
                "second_deposit_amount": select_user_token.second_deposit_amount,
                "top_uid":select_user_token.top_uid,
                "top_name": select_user_token.top_name,
                "parent_uid": select_user_token.parent_uid,
                "parent_name": select_user_token.parent_name,
                "bankcard_total": select_user_token.bankcard_total,
                "last_login_device": select_user_token.last_login_device,
                "last_login_source": select_user_token.last_login_source,
                "remarks": select_user_token.remarks,
                "state":select_user_token.state,
                "level": select_user_token.level,
                "balance": select_user_token.balance,
                "lock_amount": select_user_token.lock_amount,
                "commission": select_user_token.commission,
                "group_name": select_user_token.group_name,
                "agency_type": select_user_token.agency_type,
                "address": select_user_token.address,
                "avatar": select_user_token.avatar,
                "last_withdraw_at": select_user_token.last_withdraw_at,
                "automatic": select_user_token.automatic,
                "facebook": select_user_token.facebook,
                "whatsapp": select_user_token.whatsapp,
                "telegram": select_user_token.telegram,
                "twitter": select_user_token.twitter,
                "referer": select_user_token.referer,
                "link_id": select_user_token.link_id,
                "device": select_user_token.device,
                "fphone": select_user_token.fphone,
                "total_dept_amount": select_user_token.total_dept_amount,
                "total_wdraw_amount": select_user_token.total_wdraw_amount,
                "link_black_list": select_user_token.link_black_list,
                "next": select_user_token.next,
                "now": select_user_token.now,
                "rate": select_user_token.rate,
                "next_level": select_user_token.next_level,
                "rebate_amount":select_user_token.rebate_amount,
                "agency_amount": select_user_token.agency_amount
            }
        }

        res.json(infoUser)
    }
    else
    {

        res.json({"status":false,"data":"Not auth"}
        )
    }

}

module.exports = InfoUserMember