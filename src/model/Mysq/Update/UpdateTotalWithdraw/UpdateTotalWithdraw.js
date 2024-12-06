const knex = require('../../../../utils/knex/config')

async function UpdateTotalWithdraw(total_withdraw, username)
{

    try 
    {
    
        let update_total_withdraw = await knex('users').update({total_wdraw_amount: total_withdraw}).where('username', username)
     
        return 1
    }
    catch (error) 
    {
        console.log('error UpdateTotalWithdraw: ', error)
        return 100
    }
}

module.exports = UpdateTotalWithdraw