const MemberFavourite = require('../../core/MemberFavourite/MemberFavourite');
const GetUserFavorites = require('../../core/MemberFavourite/GetUserFavorites'); // Função para listar favoritos

exports.member_favourite = async function (req, res) {
    try {
        // Recupera o token do header
        const header_Token_auth = req.headers['t'];

        if (!header_Token_auth) {
            return res.status(400).json({ status: false, data: "Token não fornecido" });
        }

        // Verifica o token recebido
        const token_auth_object = JSON.parse(header_Token_auth);

        if (!token_auth_object.f90) {
            return res.status(400).json({ status: false, data: "Token inválido" });
        }

        // Recupera o gameId e a ação do corpo da requisição
        const { gameId, action } = req.body;

        if (!gameId || !action) {
            return res.status(400).json({ status: false, data: "Parâmetros inválidos. Informe gameId e action." });
        }

        if (!['add', 'remove'].includes(action)) {
            return res.status(400).json({ status: false, data: "Ação inválida. Use 'add' ou 'remove'." });
        }

        // Chama a função principal para favoritar/desfavoritar
        await MemberFavourite(token_auth_object.f90, gameId, action, res);
    } catch (error) {
        console.error("Erro ao processar favoritos:", error);
        res.status(500).json({ status: false, data: "Erro ao processar a solicitação" });
    }
};

// Nova função para listar favoritos
exports.list_member_favorites = async function (req, res) {
    try {
        // Recupera o token do header
        const header_Token_auth = req.headers['t'];

        if (!header_Token_auth) {
            return res.status(400).json({ status: false, data: "Token não fornecido" });
        }

        let token_auth_object;
        try {
            // Tenta fazer o parse do token recebido
            token_auth_object = JSON.parse(header_Token_auth);
        } catch (error) {
            return res.status(400).json({ status: false, data: "Token malformado ou inválido" });
        }

        if (!token_auth_object.f90) {
            return res.status(400).json({ status: false, data: "Token inválido" });
        }

        // Chama a função para listar os favoritos
        const response = await GetUserFavorites(token_auth_object.f90);

        if (!response) {
            // Garante que apenas uma resposta será enviada
            return res.status(404).json({ status: false, message: "Erro ao buscar favoritos." });
        }

        // Verifica se a resposta foi bem-sucedida
        if (response.status) {
            return res.json({ status: true, data: response.data });
        } else {
            return res.status(404).json({ status: false, message: response.message || "Erro ao buscar favoritos." });
        }
    } catch (error) {
        console.error("Erro ao listar favoritos:", error);

        // Garante que apenas uma resposta será enviada no caso de erro
        if (!res.headersSent) {
            return res.status(500).json({ status: false, data: "Erro ao processar a solicitação" });
        }
    }
};

 