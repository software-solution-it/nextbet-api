const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')
const SelectMemberDirectAgencyBet = require('../../model/Mysq/Select/SelectMemberDirectAgencyBet/SelectMemberDirectAgencyBet')
const SelectMemberRecordGame = require('../../model/Mysq/Select/SelectMemberRecordGame/SelectMemberRecordGame')

async function MemberDirectAgencyBetCore(token, body, res) {
    let select_user_token = await SelectTokenUser(token);

    if (select_user_token) {
        let afiliates = await SelectMemberDirectAgencyBet(select_user_token.id);
        let obj_data = new Map(); // Usar Map para armazenar dados por usuário

        for (let afiliate of afiliates) {
            let member_record_per_user = await SelectMemberRecordGame(body.page, body.page_size, afiliate.username, body.start_time, body.end_time);

            console.log(member_record_per_user)
            member_record_per_user.forEach((record_game) => {
                if (obj_data.has(record_game.name)) {
                    // Se o usuário já existe no Map, atualizar a soma das apostas
                    let currentData = obj_data.get(record_game.name);
                    currentData.bet_num += record_game.valid_bet_amount;
                    obj_data.set(record_game.name, currentData);
                } else {
                    // Se o usuário não existe no Map, adicionar novo registro
                    obj_data.set(record_game.name, {
                        username: record_game.name,
                        bet_num: record_game.valid_bet_amount,
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
                "t": body.page,
                "s": body.page_size
            }
        })
        // Aqui você terá o array de objetos com os dados agrupados por usuário e as apostas somadas
    } else {
        res.json({ "status": false, "data": "Não Autenticado" });
    }
}


module.exports = MemberDirectAgencyBetCore
