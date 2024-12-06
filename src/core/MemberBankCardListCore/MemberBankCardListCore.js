const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')
const SelectBankCardListUser = require('../../model/Mysq/Select/BankCard/SelectBankCardListUser/SelectBankCardListUser')

async function MemberBankCardListCore(token, res)
{

    let select_user_token = await SelectTokenUser(token)

    if (select_user_token) {


        let select_bank_card_list_user = await SelectBankCardListUser(select_user_token.id)

        if (select_bank_card_list_user) {
            
            let response_json_bank_Card_list_user = {
                "status": true,
                "data": select_bank_card_list_user
            }

            res.json(response_json_bank_Card_list_user)
        }
        else
        {
            let response_json_bank_card_list_not = {"status":true,"data":null}

            res.json(response_json_bank_card_list_not)
        }

    }
    else
    {
        res.json({"status":false,"data":"Not Auth"})

    }

}

module.exports = MemberBankCardListCore