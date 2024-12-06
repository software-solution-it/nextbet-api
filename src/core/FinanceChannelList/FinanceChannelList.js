const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')
const SelectFinanceChannelType = require('../../model/Mysq/Select/SelectFInanceChannelType/SelectFInanceChannelType')
const SelectFinanceChannelList = require('../../model/Mysq/Select/SelectFinanceChannelList/SelectFinanceChannelList')
const SelectFinanceBonusList = require('../../model/Mysq/Select/SelectFinanceChannelBonusList/SelectFinanceChannelBonusList')
async function FinanceChannelList(token, body,res)
{

    let select_user_token = await SelectTokenUser(token)

    if (select_user_token) {
        
        const channel_type = parseInt(body.channel_type)

        const select_finance_channel_type = await SelectFinanceChannelType(1,channel_type)

        if (select_finance_channel_type) {
            const select_finance_channel_list = await SelectFinanceChannelList(channel_type)


            console.log(select_user_token.first_deposit_amount > 0)
            if (select_user_token.first_deposit_amount > 0) {
                const select_finance_bonus_list = await SelectFinanceBonusList();

               
                const updated_select_finance_bonus_list = select_finance_bonus_list.map(item => {
                    return {
                        ...item,
                        bonus_amount: 0
                    };
                });
                
                select_finance_channel_list.forEach(item => {
                    item.bonus_list = updated_select_finance_bonus_list;
                });
                
                let finance_channel_type_response = {
                    "status": true,
                    "data": select_finance_channel_list
                };
 
                res.json(finance_channel_type_response) 
            }
            else
            {
                const select_finance_bonus_list = await SelectFinanceBonusList()

            
                select_finance_channel_list.forEach(item => {
                    item.bonus_list = select_finance_bonus_list;
                });
                let finance_channel_type_response ={
                    "status": true,
                    "data": select_finance_channel_list
                }
         
                res.json(finance_channel_type_response)
            }
     
        }
     
    }
    else
    {

        res.json({"status":false,"data":"Não Autenticado"}
        )
    }

}

module.exports = FinanceChannelList