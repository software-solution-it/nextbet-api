const axios = require('axios')
const crypto = require('crypto');

require('dotenv').config()

function dateNowSP() {
    return new Date().toISOString();
}
function DueDate() {
    // Data e hora atuais em UTC
    let hoje = new Date();

    // Adicionar 1 dia
    let amanha = new Date(hoje);
    amanha.setUTCDate(hoje.getUTCDate() + 1);

    // Retornar no padrão ISO 8601 com o sufixo 'Z' (indicando UTC)
    return amanha.toISOString().split('.')[0] + 'Z';
}
async function generateCredentials(url, clientid, clientsecret) {
    try {
        const headers = {
            'Content-Type': 'application/json'
        }

        const response = await axios.post(url + '/api/token/api', {
            'clientId': clientid,
            'secret': clientsecret
        }, { headers });

        return response.data.accessToken;

    } catch (error) {
        console.log(error)
        return false
    }
}

async function GetQrCodeDigitoPay(url, ci, cs, cpf, name, bill_no, amount) {

    try {


        const idRequest = bill_no;
        const acesstoken = await generateCredentials(url, ci, cs);
        if (!acesstoken) {
            return 1000
        }

        const urlapi = `${url}/api/deposit`;
        const data = {
            dueDate: DueDate(),
            paymentOptions: ["PIX"],
            value: amount,
            callbackUrl: `${process.env.APP_URL}/digito/verify/pay`,
            person: {
                name: name,
                cpf: cpf,
            }
        };

        const headers = {
            'Authorization': `Bearer ${acesstoken}`,
            'Content-Type': 'application/json',
        };

        const response = await axios.post(urlapi, data, { headers });

        return response.data
    }
    catch (error) {
        console.log('error GetQrCodeDigitoPay: ', error)

        return 1000
    }

}

module.exports = GetQrCodeDigitoPay