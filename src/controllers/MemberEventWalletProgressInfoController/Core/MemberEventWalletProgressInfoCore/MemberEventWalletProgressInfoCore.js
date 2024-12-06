const SelectTokenUser = require('../../../../model/Mysq/SelectTokenUser/SelectTokenUser')


async function MemberEventWalletProgressInfoCore(token, res)
{

    let select_token_user = await SelectTokenUser(token)


    if (select_token_user) {

        let porcent_luck_concluido = select_token_user.porcent_luck_concluido

        res.json({status:true, data: {progress: porcent_luck_concluido}})
    } else {
        res.json({ "status": false, "data": "Não Autenticado" });

    }

}

module.exports =  MemberEventWalletProgressInfoCore