const knex = require('../../../utils/knex/config');

async function CreateOrUpdateUserFavourite(userId, gameId, action) {
    try {
        if (action === 'add') {
            // Verifica se o favorito já existe
            const existingFavourite = await knex('user_favorites')
                .where({ user_id: userId, game_id: gameId })
                .first();

            if (existingFavourite) {
                return { status: 200, message: 'Jogo já está nos favoritos.' };
            }

            // Insere um novo favorito
            await knex('user_favorites').insert({
                user_id: userId,
                game_id: gameId,
            });

            return { status: 201, message: 'Jogo adicionado aos favoritos.' };
        } else if (action === 'remove') {
            // Remove o favorito
            const deletedRows = await knex('user_favorites')
                .where({ user_id: userId, game_id: gameId })
                .del();

            if (deletedRows > 0) {
                return { status: 200, message: 'Jogo removido dos favoritos.' };
            } else {
                return { status: 404, message: 'Jogo não encontrado nos favoritos.' };
            }
        } else {
            return { status: 400, message: 'Ação inválida. Use "add" ou "remove".' };
        }
    } catch (error) {
        console.error('Erro em CreateOrUpdateUserFavourite:', error);
        return { status: 500, message: 'Erro interno no servidor.' };
    }
}

module.exports = CreateOrUpdateUserFavourite;
