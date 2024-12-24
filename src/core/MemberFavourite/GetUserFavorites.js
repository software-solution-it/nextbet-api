const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser');
const ListUserFavorites = require('../../model/Mysq/Any/ListUserFavorites');

async function GetMemberFavorites(token) {
    try {
        // Verifica o usuário pelo token
        const select_user_token = await SelectTokenUser(token);

        if (!select_user_token) {
            return { status: false, message: "Usuário não encontrado" };
        }

        const userId = select_user_token.id;

        // Obtém os jogos favoritos do usuário
        const favoritesResponse = await ListUserFavorites(userId);

        if (favoritesResponse.status) {
            return { status: true, data: favoritesResponse.data };
        } else {
            return { status: false, message: favoritesResponse.message };
        }
    } catch (error) {
        console.error("Erro em GetMemberFavorites:", error);
        return { status: false, message: "Erro ao processar a solicitação" };
    }
}

module.exports = GetMemberFavorites;
