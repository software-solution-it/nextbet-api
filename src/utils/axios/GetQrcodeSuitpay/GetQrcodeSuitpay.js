const axios = require('axios')
const crypto = require('crypto');

require('dotenv').config()

function dateNowSP() {
    return new Date().toISOString();
}
async function generateCredentials(url, clientid, clientsecret) {
    try {

        let string = `${clientid}:${clientsecret}`;
        let hashedstring = Buffer.from(string).toString('base64')


        const headers = {
            'Authorization': `Basic ${hashedstring}`
        }

        const response = await axios.post(url + '/v2/oauth/token', 'grant_type="client_credentials', { headers });

        return response.data.access_token;

    } catch (error) {
        console.log(error)
        return false
    }
}

async function GetQrcodeSuitpay(url, ci, cs, cpf, name, bill_no, amount) {

    try {


        const dataFormatada = dateNowSP();
        const idRequest = bill_no;
        const acesstoken = await generateCredentials(url, ci, cs);
        console.log(acesstoken)

        const urlapi = `${url}/v2/pix/qrcode`;
        const data = {
            external_id: idRequest,
            payerQuestion: `PIX DEPOSITO ${amount}`,
            amount: amount,
            postbackUrl: `${process.env.APP_URL}/v1/verify/pay`,
            payer: {
                name: name,
                document: cpf,
                email: name,
            }
        };

        // Configuração dos headers da requisição
        const headers = {
            'Authorization': `Bearer ${acesstoken}`,
            'Content-Type': 'application/json',
        };

        // Realiza a requisição usando Axios com async/await
        const response = await axios.post(urlapi, data, { headers });

        return response.data
    }
    catch (error) {
        console.log('error GetQrcodeSuitpay: ', error)

        return 1000
    }

}

module.exports = GetQrcodeSuitpay