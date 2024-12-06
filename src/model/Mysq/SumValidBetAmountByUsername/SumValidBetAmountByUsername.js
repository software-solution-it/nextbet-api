const knex = require('../../../utils/knex/config');

async function SumValidBetAmountByUsername(name) {
    try {
        // Soma o campo 'valid_bet_amount' para todas as linhas que possuem o 'name' fornecido
        const result = await knex('member_record_game')
            .where('name', name) // Filtra por 'name' em vez de 'username'
            .sum('valid_bet_amount as total'); // Realiza a soma do campo 'valid_bet_amount'

        // Retorna o valor da soma
        return result[0].total || 0; // Retorna 0 se o total for undefined ou null
    } catch (error) {
        console.log('Erro ao calcular a soma de valid_bet_amount: ', error);

        return 0; // Retorna 0 em caso de erro
    }
}

module.exports = SumValidBetAmountByUsername;
