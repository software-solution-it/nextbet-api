const MemberBalance = require('../../core/MemberBalance/MemberBalance');

exports.member_balance = async function (req, res) {
    try {
        const header_Token_auth = req.headers['t'];

        if (!header_Token_auth) {
            return res.status(400).json({ status: false, data: "Token não fornecido" });
        }

        const token_auth_object = JSON.parse(header_Token_auth);

        if (!token_auth_object.f90) {
            return res.status(400).json({ status: false, data: "Token inválido" });
        }

        await MemberBalance(token_auth_object.f90, res);
    } catch (error) {
        console.error("Erro ao processar token:", error);
        res.status(500).json({ status: false, data: "Erro ao processar o token de autenticação" });
    }
};
