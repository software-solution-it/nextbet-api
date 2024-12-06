const SelectBankCardTypeList = require('../../model/Mysq/Select/SelectBankCardTypeList/SelectBankCardTypeList')
const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')

async function MemberBankCardTypeListCore(token, res)
{

    let select_user_token = await SelectTokenUser(token)

    if (select_user_token) {


        let select_bank_card_type_list = await SelectBankCardTypeList()

        let response_json_bank_card_type_list = {
            "status": true,
            "data": select_bank_card_type_list
        }

        res.json(response_json_bank_card_type_list)
    }
    else
    {
        res.json({"status":false,"data":"Not Auth"})

    }

}


module.exports = MemberBankCardTypeListCore