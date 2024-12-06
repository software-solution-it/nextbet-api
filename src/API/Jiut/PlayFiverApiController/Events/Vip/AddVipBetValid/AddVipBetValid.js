const UpdateVipState = require('../Model/Update/UpdateVipState/UpdateVipState');
const selectUser = require('../../../../../../model/Mysq/SelectUser/SelectUser');
const knex = require('../../../../../../utils/knex/config');

async function AddVipBetValid(trx, bet_amount, username) {
    if (bet_amount <= 0) {
        return 101; // Indica que o valor da aposta é inválido
    }

    try {
        // Seleciona o usuário dentro da transação
        let user = await trx('users').where('username', username).first();
        if (!user) {
            return 0; // Indica que o usuário não foi encontrado
        }

        // Calcula o novo valor
        let now_update = bet_amount + user.now;

        // Atualiza o estado VIP dentro da transação
        let update_vip_state = await trx('users').where('username', username).update({ now: now_update });
        if (update_vip_state === 1) {
            return 1; // Indica sucesso na atualização
        } else {
            return 0; // Indica falha na atualização
        }
    } catch (error) {
        console.error(`Error in AddVipBetValid: ${error.message}`);
        return 0; // Indica erro interno
    }
}

module.exports = AddVipBetValid;
