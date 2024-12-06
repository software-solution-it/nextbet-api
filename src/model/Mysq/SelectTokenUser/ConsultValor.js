const axios = require('axios');

// URL do endpoint que retorna os dados em JSON
const url = 'https://b360i.com/member/record/game?flag=&platform_id=&game_type=&ty=0&page_size=10&player_name=&start_time=2024-09-08%2000%3A00%3A00&end_time=2024-09-08%2023%3A59%3A59&page=1&t=1725846962592';

async function fetchAndSumBets() {
    try {
        // Fazer a requisição ao endpoint
        const response = await axios.get(url);
        const data = response.data;

        // Supondo que os dados retornados são um array de objetos
        // e que o campo com o valor das apostas válidas é chamado 'validBet'
        let totalValidBets = 0;

        data.forEach(record => {
            const validBetValue = parseFloat(record.validBet); // Ajuste o nome do campo conforme necessário
            if (!isNaN(validBetValue)) {
                totalValidBets += validBetValue;
            }
        });

        return totalValidBets.toFixed(2);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error; // Lança o erro para que o chamador possa lidar com ele
    }
}

module.exports = fetchAndSumBets;