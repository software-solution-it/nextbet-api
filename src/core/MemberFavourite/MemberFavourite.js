const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser');
const CreateOrUpdateUserFavourite = require('../../model/Mysq/Any/CreateOrUpdateUserFavourite'); // Importe a função de favoritos

async function MemberFavourite(token, gameId, action, res) {
    try {
        // Verifica o usuário pelo token
        const select_user_token = await SelectTokenUser(token);

        if (select_user_token) {
            // Obtém o ID do usuário do token
            const userId = select_user_token.id;

            // Chama a função para criar ou atualizar favoritos
            const favouriteResponse = await CreateOrUpdateUserFavourite(userId, gameId, action);

            // Verifica o resultado da operação
            if (favouriteResponse.status === 201) {
                res.json({
                    status: true,
                    message: favouriteResponse.message,
                });
            } else if (favouriteResponse.status === 200) {
                res.json({
                    status: true,
                    message: favouriteResponse.message,
                });
            } else {
                res.json({
                    status: false,
                    message: favouriteResponse.message,
                });
            }
        } else {
            res.json({ status: false, message: "Usuário não encontrado" });
        }
    } catch (error) {
        console.error("Erro em MemberFavourite:", error);
        res.status(500).json({ status: false, message: "Erro ao processar a solicitação" });
    }
}

module.exports = MemberFavourite;
