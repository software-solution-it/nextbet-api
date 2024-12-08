const BlackBoxCore = require('../../core/BlackboxGame/BlackboxGame');

const BlackboxPlatformGameController = {
    async listProviders(req, res) {
        try {
            const providers = await BlackBoxCore.getAllProviders();
            return res.json({ status: true, data: providers });
        } catch (error) {
            console.error('Erro ao listar provedores:', error.message);
            return res.status(500).json({ status: false, message: 'Erro ao listar provedores' });
        }
    },

    async listGames(req, res) {
        try {
            const { distribution } = req.query;
    
            if (!distribution) {
                return res.status(400).json({ status: false, message: "O parâmetro 'distribution' é obrigatório." });
            }
    
            const games = await BlackBoxCore.getAllGames(distribution);
    
            return res.json({ status: true, data: games });
        } catch (error) {
            console.error('Erro ao listar jogos:', error.message);
            return res.status(500).json({ status: false, message: 'Erro ao listar jogos' });
        }
    },

    async launchGame(req, res) {
        try {
            const header_Token_auth = req.headers['t'];

            // Extrai o sessionId no formato desejado
            const token_auth_object_obj = JSON.parse(header_Token_auth); // Exemplo: {"f90":"0775897943124897"}
            const token_auth_numbers = token_auth_object_obj.f90.replace(/\D/g, '');

            const gameUrl = await BlackBoxCore.launchGame(token_auth_numbers, req.body, res);

            if (gameUrl) {
                return res.json({ status: true, gameUrl });
            } else {
                return res.status(400).json({ status: false, message: 'Não foi possível lançar o jogo.' });
            }
        } catch (error) {
            console.error('Erro ao lançar o jogo:', error.message);
            return res.status(500).json({ status: false, message: 'Erro ao lançar o jogo' });
        }
    },

    async webhook(req, res) {
        try {
            const result = await BlackBoxCore.processWebhook(req.body);
            return res.status(200).json(result);
        } catch (error) {
            console.error('Erro no webhook:', error.message);
            return res.status(500).json({ status: false, message: 'Erro no webhook' });
        }
    },
};

module.exports = BlackboxPlatformGameController;
