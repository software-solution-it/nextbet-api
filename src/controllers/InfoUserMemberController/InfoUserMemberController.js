const InfoUserMember = require('../../core/InfoUserMember/InfoUserMember');

exports.info_user = async function (req, res) {
    try {
        const header_Token_auth = req.headers['t'];

        if (!header_Token_auth) {
            return res.status(400).json({ status: false, message: "Token is required" });
        }

        // Diretamente parsear o token no formato esperado
        const token_auth_object = JSON.parse(header_Token_auth);

        if (!token_auth_object.f90) {
            return res.status(400).json({ status: false, message: "Invalid token format" });
        }

        const info_user_member = await InfoUserMember(token_auth_object.f90, res);
        
        return info_user_member;
    } catch (error) {
        console.error('Error processing info_user:', error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};
