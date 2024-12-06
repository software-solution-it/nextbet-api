const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')
const SelectHistoryGameRecent = require('../../model/Mysq/Select/SelectHistoryGameRecent/SelectHistoryGameRecent')

async function MemberHistoryDetailCore(token,res)
{

    let select_user_token = await SelectTokenUser(token);

    if (select_user_token) {

        let select_history_game_recent = await SelectHistoryGameRecent(select_user_token.username)
        
        res.json({
            "status": true,
            "data": {
                "d": select_history_game_recent,
                "t": select_history_game_recent.length
            }
        })
    }
    else
    {
        res.json({ "status": false, "data": "Não Autenticado" });

    }

}
// {
//     "status": true,
//     "data": {
//         "d": [
//             {
//                 "id": "100935460972912",
//                 "platform_id": "26595015200313",
//                 "en_name": "Fortune Ox",
//                 "client_type": "0",
//                 "game_type": "3",
//                 "game_id": "98",
//                 "img": "/images-br/PG/PG-SLOT-070.png.webp",
//                 "is_hot": 1,
//                 "is_new": 1,
//                 "name": "十倍金牛",
//                 "sorting": 97,
//                 "vn_alias": "Chú Bò May Mắn"
//             },
//             {
//                 "id": "101907658635410",
//                 "platform_id": "26595015200313",
//                 "en_name": "Fortune Mouse",
//                 "client_type": "",
//                 "game_type": "3",
//                 "game_id": "68",
//                 "img": "/images-br/PG/PG-SLOT-043.png.webp",
//                 "is_hot": 1,
//                 "is_new": 1,
//                 "name": "鼠鼠福福",
//                 "sorting": 96,
//                 "vn_alias": "Chú Chuột May Mắn"
//             }
//         ],
//         "t": 2
//     }
// }

module.exports = MemberHistoryDetailCore


// favorito {"status":true,"data":1000} save ok member/favorites/save

// member/favorites/detail / 

// {
//     "status": true,
//     "data": {
//         "d": [
//             {
//                 "id": "866804850146253",
//                 "platform_id": "26595015200313",
//                 "en_name": "Fortune Dragon",
//                 "client_type": "0",
//                 "game_type": "3",
//                 "game_id": "1695365",
//                 "img": "/images-br/PG/PG-SLOT-132.png.webp",
//                 "is_hot": 1,
//                 "is_new": 1,
//                 "name": "Fortune Dragon",
//                 "sorting": 100,
//                 "vn_alias": "Fortune Dragon",
//                 "is_favorites": 1
//             }
//         ],
//         "t": 1
//     }
// }


// member/favorites/remove ;// {"status":true,"data":1000} ok