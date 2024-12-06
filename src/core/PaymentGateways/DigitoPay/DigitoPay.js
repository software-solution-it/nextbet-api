const axios = require('axios');
const knex = require('../../../utils/knex/config');
require('dotenv').config();

const DIGITOPAY_BASE_URL = 'https://api.digitopayoficial.com.br/api';

class DigitoPay {
    constructor() {
        this.clientId = '';
        this.clientSecret = '';
        this.accessToken = '';
    }

    async init() {
        try {
            const gateway = await knex.table('gateways').select('*').where('id', 1).first();
            if (!gateway || gateway.digitopay_active !== 1) {
                throw new Error("DigitoPay não está ativo ou não foi encontrado.");
            }
            this.clientId = gateway.digitopay_client_id;
            this.clientSecret = gateway.digitopay_client_secret;
            await this.authenticate();
        } catch (error) {
            console.error("Erro ao inicializar DigitoPay:", error.message);
        }
    }

    async authenticate() {
        try {

            console.log(this.clientId);
            console.log(this.clientSecret);

            const response = await axios.post(`${DIGITOPAY_BASE_URL}/token/api`, {
                clientId: this.clientId,
                secret: this.clientSecret,
            });

            if (response.status === 200) {
                this.accessToken = response.data.accessToken;
                console.log("Autenticado com sucesso na API do DigitoPay");
            } else {
                throw new Error("Erro ao obter token de acesso");
            }
        } catch (error) {
            console.error("Erro ao autenticar na API DigitoPay:", error);
        }
    }

    async authenticatedRequest(method, url, data = null) {
        try {
            console.log(`Iniciando requisição ${method.toUpperCase()} para ${url}`);
            if (data) {
                console.log('Dados da requisição:', JSON.stringify(data, null, 2));
            }

            const options = {
                method: method,
                url: `${DIGITOPAY_BASE_URL}${url}`,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
                data: data,
            };

            const response = await axios(options);
            console.log('Resposta recebida:', JSON.stringify(response.data, null, 2));

            if (response.status === 200) {
                return response.data;
            } else {
                console.error("Erro ao realizar requisição (status diferente de 200):", response.data);
                return null;
            }
        } catch (error) {
            if (error.response) {
                console.error("Erro na requisição:", {
                    status: error.response.status,
                    statusText: error.response.statusText,
                    data: error.response.data
                });
            } else if (error.request) {
                console.error("Erro na requisição: Nenhuma resposta recebida", error.request);
            } else {
                console.error("Erro ao configurar a requisição:", error.message);
            }
            return null;
        }
    }

    async makeDeposit(depositRequest, res) {
        try {
            const depositData = {
                dueDate: new Date().toISOString(),
                paymentOptions: ["PIX"],
                person: {
                    cpf: depositRequest.cpf,
                    name: depositRequest.name,
                },
                value: depositRequest.amount,
                // Inclui o sessionId no callbackUrl
                callbackUrl: `https://3811-177-84-243-102.ngrok-free.app/websocket/deposit/digitopay?sessionId=${depositRequest.sessionId}`,
                splitConfiguration: undefined,
            };
    
            const depositResponse = await this.authenticatedRequest('post', '/deposit', depositData);
            if (depositResponse && depositResponse.success) {
                console.log(depositResponse.qrCodeBase64);
                const cleanedQrCodeBase64 = depositResponse.qrCodeBase64.trim();
    
                return res.json({
                    status: true,
                    data: {
                        id: depositResponse.id,
                        txid: depositResponse.txid,
                        endToEndId: depositResponse.endToEndId,
                        pixCopiaECola: depositResponse.pixCopiaECola,
                        qrCodeBase64: cleanedQrCodeBase64,
                        amount: depositRequest.amount,
                    },
                });
            } else {
                return res.status(500).json({ status: false, data: "Erro ao processar depósito na DigitoPay" });
            }
        } catch (error) {
            console.error("Erro ao processar depósito na DigitoPay:", error.message || error);
            return res.status(500).json({ status: false, data: "Erro ao processar depósito" });
        }
    }
    

    async withdraw(withdrawRequest, res) {
        try {
            const withdrawData = {
                paymentOptions: ["PIX"],
                person: {
                    pixKey: withdrawRequest.pixKey,
                },
                value: withdrawRequest.amount,
            };

            const withdrawResponse = await this.authenticatedRequest('post', '/withdraw', withdrawData);
            if (withdrawResponse && withdrawResponse.success) {
                return res.json({
                    status: true,
                    data: {
                        id: withdrawResponse.id,
                        isSend: withdrawResponse.isSend,
                    },
                });
            } else {
                return res.status(500).json({ status: false, data: "Erro ao processar saque na DigitoPay" });
            }
        } catch (error) {
            console.error("Erro ao processar saque na DigitoPay:", error);
            return res.status(500).json({ status: false, data: "Erro ao processar saque" });
        }
    }

    async getTransactionStatus(transactionId, res) {
        try {
            const statusResponse = await this.authenticatedRequest('get', `/status/${transactionId}`);
            if (statusResponse) {
                return res.json({
                    status: true,
                    data: statusResponse,
                });
            } else {
                return res.status(500).json({ status: false, data: "Erro ao obter status da transação" });
            }
        } catch (error) {
            console.error("Erro ao obter status da transação:", error);
            return res.status(500).json({ status: false, data: "Erro ao obter status" });
        }
    }

    async getPixKey(pixKey, pixType, res) {
        try {
            const pixResponse = await this.authenticatedRequest('get', `/getPixKey?pixKey=${pixKey}&pixType=${pixType}`);
            if (pixResponse) {
                return res.json({
                    status: true,
                    data: pixResponse,
                });
            } else {
                return res.status(500).json({ status: false, data: "Erro ao obter informações da chave Pix" });
            }
        } catch (error) {
            console.error("Erro ao obter chave Pix:", error);
            return res.status(500).json({ status: false, data: "Erro ao obter chave Pix" });
        }
    }

    async setWebhookDeposit(url, res) {
        try {
            const webhookResponse = await this.authenticatedRequest('put', '/digitopay/webhook/deposit', { url });
            return res.json(webhookResponse);
        } catch (error) {
            console.error("Erro ao configurar webhook de depósito:", error);
            return res.status(500).json({ status: false, data: "Erro ao configurar webhook de depósito" });
        }
    }

    async setWebhookWithdraw(url, res) {
        try {
            const webhookResponse = await this.authenticatedRequest('put', '/digitopay/webhook/withdraw', { url });
            return res.json(webhookResponse);
        } catch (error) {
            console.error("Erro ao configurar webhook de saque:", error);
            return res.status(500).json({ status: false, data: "Erro ao configurar webhook de saque" });
        }
    }
}

module.exports = DigitoPay;