const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')
const InsertMemberBankCard = require('../../model/Mysq/Insert/InsertMemberBankCard/InsertMemberBankCard')
const SelectExistChavePixPayment = require('../../model/Mysq/Select/BankCard/SelectExistChavePixPayment/SelectExistChavePixPayment')
const select_Type_pix_Exist = require('../../model/Mysq/Select/BankCard/select_Type_pix_Exist/select_Type_pix_Exist')

async function BankCardInsertMemberCore(token, body, res, timestampInSeconds)
{


        //  {"status":false,"data":"1348"} response exesso de limite de uso
        // {"status":false,"data":"PIX exist!"} para pix ja existente

    let select_user_token = await SelectTokenUser(token)

    if (select_user_token) 
    {
        let bank_card = body.bank_card

        let realname = body.realname

        let content = body.content


        let ty = body.ty

        let select_exist_chave_pix_payment_withdraw = await SelectExistChavePixPayment(bank_card) 

        if (select_exist_chave_pix_payment_withdraw?.ty ?? undefined === ty) {
            res.json({"status":false,"data":"PIX exist!"})
        }
        else
        {

            let select_Type_pix_Exist_user = await select_Type_pix_Exist(select_user_token.id, ty)
            
            if (select_Type_pix_Exist_user) {
                res.json( {"status":false,"data":"1348"} )
            }
            else
            {


                let data_insert_member_card = {
                    uid: select_user_token.id,
                    username: select_user_token.username,
                    bank_card: bank_card,
                    created_at: timestampInSeconds,
                    state: 1,
                    realname: realname,
                    content:  content,
                    ty: ty

                }
                let member_insert_bank_Card = await InsertMemberBankCard(data_insert_member_card)

                if (member_insert_bank_Card === 1) {
                    res.json({"status":true,"data":"1000"})
                    
                }
                else
                {
                    res.json({"status":false,"data":"CODE ERRO 5400"})
                }

            }
        }
    }
    else
    {
        res.json({"status":false,"data":"Não Autenticado"})
    }
}

module.exports = BankCardInsertMemberCore