const knex = require('../../../../utils/knex/config')

async function UpdateTotalDepAmount (total_dep, username)
{

    try {

        let update = await knex('users').update({total_dept_amount: total_dep}).where('username', username)
        
        return 1
    } catch (error) {
        console.log('error UpdateTotalDepAmount: ',error)

        return 100
    }



}

module.exports = UpdateTotalDepAmount