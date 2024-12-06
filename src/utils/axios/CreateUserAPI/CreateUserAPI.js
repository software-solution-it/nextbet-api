// "status": 0,
// "msg": "Invalid User"

const axios = require('axios')

async function CreateUserAPI(url, body) {
    try {




        const data = {
            method: "user_create",
            user_code: body.user_code,
            agent_code: body.agent_code,
            agent_token: body.agent_token,
        };

        // Configuração dos headers da requisição
        const headers = {

            'Content-Type': 'application/json',
        };

        // Realiza a requisição usando Axios com async/await
        const response = await axios.post(url, data, { headers });

        console.log("CRIANDO USUARIO")
        console.log(response)
        return response.data

    } catch (error) {
        console.log('error CreateUserAPI', error)
        return 1000
    }
}

module.exports = CreateUserAPI