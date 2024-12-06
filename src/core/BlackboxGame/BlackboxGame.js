const knex = require('../../utils/knex/config');
const SelectTokenUser = require("../../model/Mysq/SelectTokenUser/SelectTokenUser");
const axios = require('axios');
const SelectGamesAgregationKeysBlackbox = require('../../model/Mysq/Select/SelectGamesAgregationKeys/SelectGamesAgregationKeysBlackbox');

const BlackBoxCore = {
    // Método de autenticação automático
    async authenticate() {
        try {
            // Obter as chaves de autenticação do banco
            const AgregationKeysBlackbox = await SelectGamesAgregationKeysBlackbox();
            const agentToken = AgregationKeysBlackbox.agentToken;
            const agentSecretKey = AgregationKeysBlackbox.agentSecretKey;

            const token = Buffer.from(`${agentToken}:${agentSecretKey}`).toString('base64');

            const response = await axios.post('https://gator.drakon.casino/api/v1/auth/authentication', null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200 && response.data.access_token) {
                return response.data.access_token; // Retorna o token Bearer
            } else {
                throw new Error('Falha na autenticação');
            }
        } catch (error) {
            console.error('Erro na autenticação:', error.message);
            throw error;
        }
    },

    

    // Método para listar provedores
    async getAllProviders() {
        try {
            const accessToken = await this.authenticate(); // Chama o método de autenticação
            const response = await axios.get('https://gator.drakon.casino/api/v1/games/provider', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200 && response.data.status) {
                return response.data.providers;
            } else {
                throw new Error('Erro ao buscar provedores');
            }
        } catch (error) {
            console.error('Erro ao buscar provedores:', error.message);
            throw error;
        }
    },

    // Método para listar jogos
    async getAllGames() {
        try {
            const accessToken = await this.authenticate(); // Chama o método de autenticação
            const response = await axios.get('https://gator.drakon.casino/api/v1/games/all', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200 && response.data.status) {
                return response.data.games;
            } else {
                throw new Error('Erro ao buscar jogos');
            }
        } catch (error) {
            console.error('Erro ao buscar jogos:', error.message);
            throw error;
        }
    },

    async launchGame(token, body, res) {
        try {

            const AgregationKeysBlackbox = await SelectGamesAgregationKeysBlackbox();
            let select_user_token = await SelectTokenUser(token);
            const agentCode = AgregationKeysBlackbox.agentCode;
            const agentToken = AgregationKeysBlackbox.agentToken;
            const accessToken = await this.authenticate();
    
            const apiUri = 'https://gator.drakon.casino/api/v1';
    
            const response = await axios.get(`${apiUri}/games/game_launch`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`, 
                },
                params: {
                    'agent_code': agentCode, 
                    'agent_token': agentToken, 
                    'game_id': body.gameId,
                    'type': 'CHARGED', 
                    'lang': 'pt_BR',  
                    'currency':'BRL',
                    'user_id': select_user_token.id,
                    'user_name': select_user_token.username, 
                }
            });
    
            if (response.status === 200 && response.data.game_url) {
                return response.data.game_url; 
            } else {
                throw new Error('Erro ao lançar o jogo: ' + (response.data.message || 'Desconhecido'));
            }
    
        } catch (error) {
            console.error('Erro ao lançar o jogo:', error.message);
            throw error;
        }
    },

    async processWebhook(body) {
        try {
            const { method, user_id, bet, win, amount } = body;
    
            // Validações iniciais
            if (!method) {
                return {
                    status: false,
                    message: "O campo 'method' é obrigatório.",
                };
            }
            if (!user_id) {
                return {
                    status: false,
                    message: "O campo 'user_id' é obrigatório.",
                };
            }
    
            switch (method) {
                case 'user_balance': {
                    const user = await knex('users').where({ id: user_id }).first();
                    if (user && user.balance !== null) {
                        const userBalance = parseFloat(user.balance).toFixed(2); // Formata como decimal
                        return {
                            status: 1,
                            balance: userBalance,
                        };
                    } else {
                        return {
                            status: 0,
                            message: "Usuário não encontrado ou saldo inválido.",
                        };
                    }
                }
    
                case 'account_details': {
                    const account = await knex('users').where({ id: user_id }).first();
                    if (account) {
                        return {
                            status: 1,
                            user_id: account.id,
                            email: account.email,
                            name_jogador: account.name,
                        };
                    } else {
                        return {
                            status: 0,
                            message: "Detalhes da conta não encontrados.",
                        };
                    }
                }
    
                case 'transaction_bet': {
                    const user = await knex('users').where({ id: user_id }).first();
                    if (user && user.balance !== null) {
                        if (user.balance >= bet) {
                            const newBalance = parseFloat(user.balance - bet).toFixed(2);
                            await knex('users').where({ id: user_id }).update({ balance: newBalance });
    
                            return {
                                status: 1,
                                balance: newBalance,
                            };
                        } else {
                            return {
                                status: 0,
                                message: "Saldo insuficiente.",
                            };
                        }
                    } else {
                        return {
                            status: 0,
                            message: "Usuário não encontrado ou saldo inválido.",
                        };
                    }
                }
    
                case 'transaction_win': {
                    const user = await knex('users').where({ id: user_id }).first();
                    if (user && user.balance !== null) {
                        const newBalance = parseFloat(user.balance + win).toFixed(2);
                        await knex('users').where({ id: user_id }).update({ balance: newBalance });
    
                        return {
                            status: 1,
                            balance: newBalance,
                        };
                    } else {
                        return {
                            status: 0,
                            message: "Usuário não encontrado ou saldo inválido.",
                        };
                    }
                }
    
                case 'refund': {
                    const user = await knex('users').where({ id: user_id }).first();
                    if (user && user.balance !== null) {
                        const newBalance = parseFloat(user.balance + amount).toFixed(2);
                        await knex('users').where({ id: user_id }).update({ balance: newBalance });
    
                        return {
                            status: 1,
                            balance: newBalance,
                        };
                    } else {
                        return {
                            status: 0,
                            message: "Usuário não encontrado ou saldo inválido.",
                        };
                    }
                }
    
                default:
                    return {
                        status: false,
                        message: "Método desconhecido.",
                    };
            }
        } catch (error) {
            console.error("Erro ao processar o webhook:", error.message, error.stack);
            return {
                status: false,
                message: "Erro interno ao processar a solicitação.",
            };
        }
    }
    
};

module.exports = BlackBoxCore;
