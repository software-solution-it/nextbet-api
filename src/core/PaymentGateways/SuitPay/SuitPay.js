const SelectTokenUser = require('../../../model/Mysq/SelectTokenUser/SelectTokenUser')
const SelectDepositGenerationID = require('../../../model/Mysq/Select/SelectDepositGenerationID/SelectDepositGenerationID')
const GetQrcodeSuitpay = require('../../../utils/axios/GetQrcodeSuitpay/GetQrcodeSuitpay')
const GetQrCodeDigitoPay = require('../../../utils/axios/GetQrCodeDigitoPay/GetQrCodeDigitoPay')
const UpdateMemberRecordTransactionIdSuitpay = require('../../../model/Mysq/Update/UpdateMemberRecordTransactionIdSuitpay/UpdateMemberRecordTransactionIdSuitpay')
const QRCode = require('qrcode');
const knex = require('../../../utils/knex/config');

require('dotenv').config()

async function generateQRCodeBase64(data) {
    try {
        const qrCodeBase64 = await QRCode.toDataURL(data);
        return qrCodeBase64; // Isso será uma string base64 que representa a imagem do QR Code
    } catch (error) {
        console.error("Erro ao gerar o QR Code:", error);
    }
}
async function Suitpay(token, code_buy, res) {

    let gateways = await knex.table('gateways').select('*').where('id', 1).first();
    console.log(gateways);
    let select_user_token = await SelectTokenUser(token)

    if (select_user_token) {

        let username = select_user_token.username


        let transaction_info = await SelectDepositGenerationID(code_buy.cbuy)


        if (transaction_info.username === username) {
            if (gateways['pixup_active'] === 1 | gateways['bspay_active'] === 1) {
                let url = "";
                let clientid = "";
                let clientsecret = "";

                if (gateways['pixup_active'] === 1) {
                    url = gateways['pixup_endpoint'];
                    clientid = gateways['pixup_client_id'];
                    clientsecret = gateways['pixup_client_secret'];
                } else {
                    url = gateways['bspay_endpoint'];
                    clientid = gateways['bspay_client_id'];
                    clientsecret = gateways['bspay_client_secret'];
                }

                let send_request_suitpay = await GetQrcodeSuitpay(url, clientid, clientsecret, '711.919.080-62', username, code_buy.cbuy, transaction_info.amount)
                const paymentcodebase64 = await generateQRCodeBase64(send_request_suitpay.qrcode);
                console.log(send_request_suitpay.data)


                if (send_request_suitpay.status === "PENDING") {
                    let update_transaction_id_suitpay = await UpdateMemberRecordTransactionIdSuitpay(code_buy.cbuy, send_request_suitpay.transactionId)

                    if (update_transaction_id_suitpay === 1) {

                        res.json({ qrcode: send_request_suitpay.qrcode, qrcodeBase64: paymentcodebase64, amount: transaction_info.amount })
                    }
                    else {
                        res.json({ "status": false, "data": "Entre contato com suporte!", code: 500 })

                    }
                }
                else {
                    res.json({ "status": false, "data": "Entre contato com suporte!", code: 400 })
                }
            } else {
                url = gateways['digitopay_endpoint'];
                    clientid = gateways['digitopay_client_id'];
                    clientsecret = gateways['digitopay_client_secret'];

                let sendrequestdigitopay = await GetQrCodeDigitoPay(url, clientid, clientsecret, '711.919.080-62', username, code_buy.cbuy, transaction_info.amount)


                if (sendrequestdigitopay.success === true) {
                    let update_transaction_id_suitpay = await UpdateMemberRecordTransactionIdSuitpay(code_buy.cbuy, sendrequestdigitopay.id)

                    if (update_transaction_id_suitpay === 1) {

                        res.json({ qrcode: sendrequestdigitopay.pixCopiaECola, qrcodeBase64: sendrequestdigitopay.qrCodeBase64, amount: transaction_info.amount })
                    }
                    else {
                        console.log('primeiro else')
                        res.json({ "status": false, "data": "Entre contato com suporte!", code: 500 })

                    }
                }
                else {
                    console.log('segundo else')
                    res.json({ "status": false, "data": "Entre contato com suporte!", code: 400 })
                }
            }



        }
        else {
            res.json({ "status": false, "data": "Dados incorretos." })

        }

    }
    else {
        res.json({ "status": false, "data": "Não autenticado por favor faça login novamente." })
    }

}


module.exports = Suitpay