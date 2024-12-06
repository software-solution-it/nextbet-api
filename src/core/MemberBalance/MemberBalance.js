const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser');

async function MemberBalance(token, res) {
    try {
        let select_user_token = await SelectTokenUser(token);

        if (select_user_token) {
            const response_json_member_balance = {
                status: true,
                data: {
                    uid: select_user_token.id,
                    balance: select_user_token.balance,
                    lock_amount: select_user_token.lock_amount,
                    bonus: select_user_token.bonus || 0, // Bônus do usuário
                    rollover: {
                        bet_amount: select_user_token.bet_amount || 0, // Valor total apostado para o rollover
                        required_amount: select_user_token.rollover_required_amount || 0, // Valor necessário para completar o rollover
                        rounds_played: select_user_token.rounds_played || 0, // Número de rodadas jogadas
                        total_rounds_required: select_user_token.total_rounds_required || 0 // Número total de rodadas necessárias para o rollover
                    }
                }
            };
            res.json(response_json_member_balance);
        } else {
            res.json({ status: false, data: "1062" });
        }
    } catch (error) {
        console.error("Erro ao buscar o saldo do membro:", error);
        res.status(500).json({ status: false, data: "Erro ao processar a solicitação" });
    }
}

module.exports = MemberBalance;
