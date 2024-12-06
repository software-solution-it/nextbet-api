const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')
const SelectMemberDirectAgencyBet = require('../../model/Mysq/Select/SelectMemberDirectAgencyBet/SelectMemberDirectAgencyBet')
const SelectMemberRecordGame = require('../../model/Mysq/Select/SelectMemberRecordGame/SelectMemberRecordGame')
const knex = require('../../utils/knex/config')

async function select_Count_TotalDepMembers(username) {

    try {

        const data = await knex('users')
            .where('parent_name', username)
            .sum('first_bet_amount as total_first_bet_amount');

        const totalFirstBetAmount = data[0].total_first_bet_amount;

        return totalFirstBetAmount


    } catch (error) {
        console.log('error SelectMemberRecordGame: ', error)

        return 100
    }


}


const getTotalFirstBetAmount = async (username) => {
    try {
        // Conte quantos registros existem com o 'parent_name' especificado
        const countData = await knex('users')
            .where('parent_name', username)
            .count({ count: '*' }); // Usando um alias 'count' para o resultado da contagem

        const recordCount = parseInt(countData[0].count, 10);

        // Verifique se a contagem é maior que zero
        if (recordCount > 0) {
            // Conte quantas pessoas têm 'first_bet_amount' acima de 10 reais
            const countAbove10 = await knex('users')
                .where('parent_name', username)
                .andWhere('first_deposit_amount', '>', 1)
                .distinct('id') // Ajuste o nome da coluna de identificação do usuário conforme necessário
                .count({ count: 'id' }); // Usando um alias 'count' para o resultado da contagem

            const numberOfUsersAbove10 = parseInt(countAbove10[0].count, 10);

            console.log(`Número de pessoas com 'first_bet_amount' acima de 10 reais: ${numberOfUsersAbove10}`);

            return numberOfUsersAbove10;
        } else {
            return 0; // Ou qualquer valor que faça sentido quando não há registros
        }
    } catch (error) {
        console.error('Erro ao contar pessoas com valor acima de 10 reais:', error);
        throw error;
    }

};




async function MemberAgentSubMemberCore(token, body, res) {
    let select_user_token = await SelectTokenUser(token);

    if (select_user_token) {
        let afiliates = await SelectMemberDirectAgencyBet(select_user_token.id);
        let obj_data = new Map(); // Usar Map para armazenar dados por usuário

        let total_dep_count = 0; // Para somar o total de depósitos de todos os usuários
        let direct_deposit_amount = 0; // Para somar os depósitos diretos

        for (let afiliate of afiliates) {
            // Acumular depósitos apenas uma vez por afiliado
            total_dep_count += afiliate.deposit_amount;
            direct_deposit_amount += afiliate.deposit_amount;

            let member_record_per_user = await SelectMemberRecordGame(body.page, body.page_size, afiliate.username, body.start_time, body.end_time);

            member_record_per_user.forEach((record_game) => {
                if (obj_data.has(record_game.name)) {
                    // Se o usuário já existe no Map, atualizar os valores acumulados
                    let currentData = obj_data.get(record_game.name);
                    currentData.bet_amount += record_game.valid_bet_amount;
                    currentData.bet_count += 1; // Incrementar a contagem de apostas
                    obj_data.set(record_game.name, currentData);
                } else {
                    // Se o usuário não existe no Map, adicionar novo registro
                    obj_data.set(record_game.name, {
                        username: record_game.name,
                        bet_amount: record_game.valid_bet_amount,
                        created_at: record_game.bet_time / 1000,
                        bet_count: 1, // Primeira aposta para este usuário
                        deposit_amount: afiliate.deposit_amount,
                        win: 0, // Você pode adicionar lógica para calcular o valor de 'win'
                        stat_time: 0
                    });
                }
            });
        }

        // Converter Map para array de objetos para retornar ou manipular conforme necessário
        let result = Array.from(obj_data.values());

        res.json({
            "status": true,
            "data": {
                "d": result,
                "extra": {
                    "total_deposit_amount": total_dep_count,
                    "total_first_deposit_num": await getTotalFirstBetAmount(select_user_token.username),
                    "other_deposit_amount": total_dep_count,
                    "other_first_deposit_num": await getTotalFirstBetAmount(select_user_token.username),
                    "direct_deposit_amount": await getTotalFirstBetAmount(select_user_token.username),
                    "direct_first_deposit_num": await getTotalFirstBetAmount(select_user_token.username) > 1 ? 10 : 0
                },
                "t": body.page,
                "s": body.page_size,
            }
        });
    } else {
        // Caso o token não seja válido, você pode retornar uma mensagem de erro ou outra lógica apropriada
        res.json({
            "status": false,
            "message": "Token inválido ou não encontrado."
        });
    }
}

module.exports = MemberAgentSubMemberCore