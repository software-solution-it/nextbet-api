const SelectUser = require('../../model/Mysq/SelectUser/SelectUser');
const verifyPasswordBcrypt = require('../../utils/bcrypt/verifyPassword/verifyPassword');
const token_auth_Unique = require('../../utils/tokenAuth/tokenAuth');
const updateTokenAuthUser = require('../../model/Mysq/UpdateUserTokenAuth/UpdateUserTokenAuth');

async function Login(body, res) {
    const device_no = body.device_no;

    const email = body.email;
    const password = body.password;

    const select_user = await SelectUser(email, 'email');

    if (select_user) {
        const verify_password = await verifyPasswordBcrypt(password, select_user.password);

        if (verify_password) {
            const token_unique = await token_auth_Unique();
            
            const update_token_auth = await updateTokenAuthUser(token_unique, email);

            if (update_token_auth === 1) {
                res.set('Id', 'f90:' + token_unique);
                res.set('Access-Control-Expose-Headers', 'Id');
                res.json({ "status": true, "data": "1000" });
            } else {
                res.json({ "status": false, "data": "1009" });
            }
        } else {
            res.json({ "status": false, "data": "1303" });
        }
    } else {
        res.json({ "status": false, "data": "1009" });
    }
}

module.exports = Login;
