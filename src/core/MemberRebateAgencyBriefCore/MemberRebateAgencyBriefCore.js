const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')
const SelectMemberDirectAgencyBet = require('../../model/Mysq/Select/SelectMemberDirectAgencyBet/SelectMemberDirectAgencyBet')

async function MemberRebateAgencyBriefCore(token, res)
{
    let select_user_token = await SelectTokenUser(token);

    if (select_user_token) {
        let afiliates = await SelectMemberDirectAgencyBet(select_user_token.id);


        console.log(afiliates.length)


        afiliates.forEach(element => {
            console.log(element.valid_bet_amount)
        });

        let bet_total = afiliates.reduce((total, element) => {
            return total + element.valid_bet_amount;
        }, 0);
        
        res.json({
            "status": true,
            "data": {
                "parent_uid": 0,
                "paid_amount": 0,
                "total_bet_amount": bet_total,
                "total_amount": 0,
                "last_paid_amount": 0,
                "last_total_amount": 0,
                "total_num": afiliates.length,
                "child1_total_num": afiliates.length,
                "child1_total_amount": bet_total,
                "other_total_num": 0,
                "other_total_amount": 0,
                "net_amount": -73.02,
                "valid_bet_amount": bet_total,
                "bet_num": bet_total
            }
        })
       
    } else {
        res.json({ "status": false, "data": "Não Autenticado" });
    }
}

module.exports = MemberRebateAgencyBriefCore