const knex = require('../../../../utils/knex/config')

async function UpdateUltDepositoUser(ult_deposito, username) {
    try {
        let update = await knex('users').update({ ult_deposito: ult_deposito }).where('username', username)
        return 1
    } catch (error) {
        console.log('error UpdateUltDepositoUser: ', error)
        return 100
    }
}

module.exports = UpdateUltDepositoUser