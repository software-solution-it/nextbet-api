const knex = require('../../../utils/knex/config');

async function ListUserFavorites(userId) {
    try {
        // Consulta os jogos favoritos do usuário
        const favorites = await knex('user_favorites as uf')
            .join('list_games as g', 'uf.game_id', 'g.id') // Relaciona com a tabela de jogos
            .select(
                'g.id as game_id',
                'g.name as game_name',
                'g.img as game_image',
                'g.en_name as game_en_name',
                'uf.favorited_at' // Caso tenha uma coluna para a data de favoritar
            )
            .where('uf.user_id', userId);

        // Retorna os favoritos encontrados
        return { status: true, data: favorites };
    } catch (error) {
        console.error('Erro em ListUserFavorites:', error);
        return { status: false, message: 'Erro ao buscar os favoritos do usuário.' };
    }
}

module.exports = ListUserFavorites;
