const knex = require('../../../../utils/knex/config')

async function UpdateWithdrawPwd(withdraw_pwd, username)
{

    try {
        
        let update_withdraw_pwd = await knex('users').update({withdraw_pwd: withdraw_pwd}).where('username', username)

        return 1

    } catch (error) {
        console.log('error UpdateWithdrawPwd: ', error)

        return 100
    }


}

module.exports = UpdateWithdrawPwd