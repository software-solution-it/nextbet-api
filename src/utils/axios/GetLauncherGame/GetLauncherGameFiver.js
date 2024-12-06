const SelectGamesAgregationKeys = require("../../../model/Mysq/Select/SelectGamesAgregationKeys/SelectGamesAgregationKeys");

const axios = require('axios')

async function GetLauncherGameFiver(url, body) {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        // Realiza a requisição usando Axios com async/await
        const response = await axios.post(url, JSON.stringify(body), { headers });
        return response.data

    } catch (error) {
        console.log('error GetLauncherGameFiver', error.response.data)
        return 1000
    }
}

module.exports = GetLauncherGameFiver