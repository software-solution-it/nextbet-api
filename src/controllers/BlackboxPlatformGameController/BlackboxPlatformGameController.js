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
            // Extrai os parâmetros da query string
            const { 
                offset = 0, 
                limit = 6, 
                is_hot = null, 
                is_new = null, 
                is_live = null, 
                rewards_flag = null, 
                search = null 
            } = req.query;
    
            // Converte os parâmetros para inteiros, se necessário
            const offsetInt = parseInt(offset, 10);
            const limitInt = parseInt(limit, 10);
            const isHotInt = is_hot !== null ? parseInt(is_hot, 10) : null;
            const isNewInt = is_new !== null ? parseInt(is_new, 10) : null;
            const isLiveInt = is_live !== null ? parseInt(is_live, 10) : null;
            const rewardsFlagInt = rewards_flag !== null ? parseInt(rewards_flag, 10) : null;
    
            // Chama a função getAllGames
            const groupedGames = await BlackBoxCore.getAllGames(
                offsetInt, 
                limitInt, 
                isHotInt, 
                isNewInt, 
                isLiveInt, 
                rewardsFlagInt,
                search
            );
    
            if (!groupedGames || Object.keys(groupedGames).length === 0) {
                return res.status(404).json({ status: false, message: 'Nenhum jogo encontrado.' });
            }
    
            // Prepara a resposta no formato esperado
            const result = Object.entries(groupedGames).map(([providerName, data]) => ({
                providerName,
                games: data.games,
                totalGames: data.totalGames,
            }));
    
            return res.json({
                status: true,
                result, // Lista de provedores com seus jogos e totalGames
                pagination: {
                    offset: offsetInt,
                    limit: limitInt,
                }
            });
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
