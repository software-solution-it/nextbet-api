const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')
const SelectFinanceChannelType = require('../../model/Mysq/Select/SelectFInanceChannelType/SelectFInanceChannelType')

async function FinanceChannelType(token, res)
{
    let select_user_token = await SelectTokenUser(token)

    if (select_user_token) {
        

        const select_finance_channel_type = await SelectFinanceChannelType('no','')

        let finance_channel_type_response = {
            "status": true,
            "data":select_finance_channel_type
        }

        res.json(finance_channel_type_response)
    }
    else
    {

        res.json({"status":false,"data":"Não Autenticado"}
        )
    }


}

module.exports = FinanceChannelType