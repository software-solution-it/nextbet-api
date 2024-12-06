const SelectTokenUser = require('../../model/Mysq/SelectTokenUser/SelectTokenUser')


async function ListPromotionSort(token, res) {

    let select_user_token = '';
    if (!token) {
        return res.json({ "status": false, "data": "1061" })
    }
    select_user_token = await SelectTokenUser(token)

    if (select_user_token) {


        let list_promotion_sort_json = {
            "status": true,
            "data": {
                "1": [
                    {
                        "static": {
                            "list_web": "/image/1720635043790..webp",
                            "list_h5": "/image/1720635048290..webp",
                            "title_web": "/image/1705398003881.webp",
                            "title_h5": "/image/1705398015397.webp",
                            "share_h5": "/"
                        },
                        "id": "17395548563955151",
                        "title": "Recomende amigos e ganhe bônus",
                        "state": 2,
                        "flag": "invite",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028,43,2029"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635115780..webp",
                            "list_h5": "/image/1720635122137..webp",
                            "title_web": "/image/1720635118419..webp",
                            "title_h5": "/image/1720635161404..png",
                            "share_h5": ""
                        },
                        "id": "17395548563954431",
                        "title": "Bónus de primeiro depósito",
                        "state": 2,
                        "flag": "deposit",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635151133..webp",
                            "list_h5": "/image/1720635158788..webp",
                            "title_web": "/image/1720635155872..webp",
                            "title_h5": "/image/1720635161404..png",
                            "share_h5": "/1657197245034666.png"
                        },
                        "id": "17405392470691661",
                        "title": "Bônus de suporte diário de perdas",
                        "state": 2,
                        "flag": "rescue",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635182380..webp",
                            "list_h5": "/image/1720635186271..webp",
                            "title_web": "/image/1718055900849..webp",
                            "title_h5": "/image/1718055904278..webp",
                            "share_h5": "",
                            "display_mode": 2,
                            "link_url": "VIP"
                        },
                        "id": "10556736320579983",
                        "title": "VIP",
                        "state": 2,
                        "flag": "static",
                        "grade": "1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2027,2026,2025,2028"
                    },
                    // {
                    //     "static": {
                    //         "list_web": "/image/1720635202254..webp",
                    //         "list_h5": "/image/1720635208722..webp",
                    //         "title_web": "/image/1720635205414..webp",
                    //         "title_h5": "/image/1720635211906..webp",
                    //         "share_h5": "",
                    //         "display_mode": 1,
                    //         "link_url": "/agent"
                    //     },
                    //     "id": "10560896798327497",
                    //     "title": "Atividades de comissão de agentes",
                    //     "state": 2,
                    //     "flag": "static",
                    //     "grade": "2027,2026,2025,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2028"
                    // },
                    {
                        "static": {
                            "list_web": "/image/1720635297554..webp",
                            "list_h5": "/image/1720635303871..webp",
                            "title_web": "/image/1720635300527..webp",
                            "title_h5": "/image/1720635306651..webp",
                            "share_h5": "",
                            "display_mode": 1
                        },
                        "id": "106435746950214411",
                        "title": "Jackpot Misterioso",
                        "state": 2,
                        "flag": "static",
                        "grade": "2027,2026,2025,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2028,2029"
                    }
                ],
                "2": [
                    {
                        "static": {
                            "list_web": "/image/1720635043790..webp",
                            "list_h5": "/image/1720635048290..webp",
                            "title_web": "/image/1705398003881.webp",
                            "title_h5": "/image/1705398015397.webp",
                            "share_h5": "/"
                        },
                        "id": "17395548563955151",
                        "title": "Recomende amigos e ganhe bônus",
                        "state": 2,
                        "flag": "invite",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028,43,2029"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635115780..webp",
                            "list_h5": "/image/1720635122137..webp",
                            "title_web": "/image/1720635118419..webp",
                            "title_h5": "/image/1720635161404..png",
                            "share_h5": ""
                        },
                        "id": "17395548563954431",
                        "title": "Bónus de primeiro depósito",
                        "state": 2,
                        "flag": "deposit",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635151133..webp",
                            "list_h5": "/image/1720635158788..webp",
                            "title_web": "/image/1720635155872..webp",
                            "title_h5": "/image/1720635161404..png",
                            "share_h5": "/1657197245034666.png"
                        },
                        "id": "17405392470691661",
                        "title": "Bônus de suporte diário de perdas",
                        "state": 2,
                        "flag": "rescue",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635182380..webp",
                            "list_h5": "/image/1720635186271..webp",
                            "title_web": "/image/1718055900849..webp",
                            "title_h5": "/image/1718055904278..webp",
                            "share_h5": "",
                            "display_mode": 2,
                            "link_url": "VIP"
                        },
                        "id": "10556736320579983",
                        "title": "VIP",
                        "state": 2,
                        "flag": "static",
                        "grade": "1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2027,2026,2025,2028"
                    },
                    // {
                    //     "static": {
                    //         "list_web": "/image/1720635202254..webp",
                    //         "list_h5": "/image/1720635208722..webp",
                    //         "title_web": "/image/1720635205414..webp",
                    //         "title_h5": "/image/1720635211906..webp",
                    //         "share_h5": "",
                    //         "display_mode": 1,
                    //         "link_url": "/agent"
                    //     },
                    //     "id": "10560896798327497",
                    //     "title": "Atividades de comissão de agentes",
                    //     "state": 2,
                    //     "flag": "static",
                    //     "grade": "2027,2026,2025,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2028"
                    // },
                    {
                        "static": {
                            "list_web": "/image/1720635297554..webp",
                            "list_h5": "/image/1720635303871..webp",
                            "title_web": "/image/1720635300527..webp",
                            "title_h5": "/image/1720635306651..webp",
                            "share_h5": "",
                            "display_mode": 1
                        },
                        "id": "106435746950214411",
                        "title": "Jackpot Misterioso",
                        "state": 2,
                        "flag": "static",
                        "grade": "2027,2026,2025,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2028,2029"
                    }
                ],
                "3": [
                    {
                        "static": {
                            "list_web": "/image/1720635043790..webp",
                            "list_h5": "/image/1720635048290..webp",
                            "title_web": "/image/1705398003881.webp",
                            "title_h5": "/image/1705398015397.webp",
                            "share_h5": "/"
                        },
                        "id": "17395548563955151",
                        "title": "Recomende amigos e ganhe bônus",
                        "state": 2,
                        "flag": "invite",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028,43,2029"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635115780..webp",
                            "list_h5": "/image/1720635122137..webp",
                            "title_web": "/image/1720635118419..webp",
                            "title_h5": "/image/1720635161404..png",
                            "share_h5": ""
                        },
                        "id": "17395548563954431",
                        "title": "Bónus de primeiro depósito",
                        "state": 2,
                        "flag": "deposit",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635151133..webp",
                            "list_h5": "/image/1720635158788..webp",
                            "title_web": "/image/1720635155872..webp",
                            "title_h5": "/image/1720635161404..png",
                            "share_h5": "/1657197245034666.png"
                        },
                        "id": "17405392470691661",
                        "title": "Bônus de suporte diário de perdas",
                        "state": 2,
                        "flag": "rescue",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635182380..webp",
                            "list_h5": "/image/1720635186271..webp",
                            "title_web": "/image/1718055900849..webp",
                            "title_h5": "/image/1718055904278..webp",
                            "share_h5": "",
                            "display_mode": 2,
                            "link_url": "VIP"
                        },
                        "id": "10556736320579983",
                        "title": "VIP",
                        "state": 2,
                        "flag": "static",
                        "grade": "1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2027,2026,2025,2028"
                    },
                    // {
                    //     "static": {
                    //         "list_web": "/image/1720635202254..webp",
                    //         "list_h5": "/image/1720635208722..webp",
                    //         "title_web": "/image/1720635205414..webp",
                    //         "title_h5": "/image/1720635211906..webp",
                    //         "share_h5": "",
                    //         "display_mode": 1,
                    //         "link_url": "/agent"
                    //     },
                    //     "id": "10560896798327497",
                    //     "title": "Atividades de comissão de agentes",
                    //     "state": 2,
                    //     "flag": "static",
                    //     "grade": "2027,2026,2025,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2028"
                    // },
                    {
                        "static": {
                            "list_web": "/image/1720635297554..webp",
                            "list_h5": "/image/1720635303871..webp",
                            "title_web": "/image/1720635300527..webp",
                            "title_h5": "/image/1720635306651..webp",
                            "share_h5": "",
                            "display_mode": 1
                        },
                        "id": "106435746950214411",
                        "title": "Jackpot Misterioso",
                        "state": 2,
                        "flag": "static",
                        "grade": "2027,2026,2025,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2028,2029"
                    }
                ],
                "4": [
                    {
                        "static": {
                            "list_web": "/image/1720635043790..webp",
                            "list_h5": "/image/1720635048290..webp",
                            "title_web": "/image/1705398003881.webp",
                            "title_h5": "/image/1705398015397.webp",
                            "share_h5": "/"
                        },
                        "id": "17395548563955151",
                        "title": "Recomende amigos e ganhe bônus",
                        "state": 2,
                        "flag": "invite",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028,43,2029"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635115780..webp",
                            "list_h5": "/image/1720635122137..webp",
                            "title_web": "/image/1720635118419..webp",
                            "title_h5": "/image/1720635161404..png",
                            "share_h5": ""
                        },
                        "id": "17395548563954431",
                        "title": "Bónus de primeiro depósito",
                        "state": 2,
                        "flag": "deposit",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635151133..webp",
                            "list_h5": "/image/1720635158788..webp",
                            "title_web": "/image/1720635155872..webp",
                            "title_h5": "/image/1720635161404..png",
                            "share_h5": "/1657197245034666.png"
                        },
                        "id": "17405392470691661",
                        "title": "Bônus de suporte diário de perdas",
                        "state": 2,
                        "flag": "rescue",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635182380..webp",
                            "list_h5": "/image/1720635186271..webp",
                            "title_web": "/image/1718055900849..webp",
                            "title_h5": "/image/1718055904278..webp",
                            "share_h5": "",
                            "display_mode": 2,
                            "link_url": "VIP"
                        },
                        "id": "10556736320579983",
                        "title": "VIP",
                        "state": 2,
                        "flag": "static",
                        "grade": "1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2027,2026,2025,2028"
                    },
                    // {
                    //     "static": {
                    //         "list_web": "/image/1720635202254..webp",
                    //         "list_h5": "/image/1720635208722..webp",
                    //         "title_web": "/image/1720635205414..webp",
                    //         "title_h5": "/image/1720635211906..webp",
                    //         "share_h5": "",
                    //         "display_mode": 1,
                    //         "link_url": "/agent"
                    //     },
                    //     "id": "10560896798327497",
                    //     "title": "Atividades de comissão de agentes",
                    //     "state": 2,
                    //     "flag": "static",
                    //     "grade": "2027,2026,2025,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2028"
                    // },
                    {
                        "static": {
                            "list_web": "/image/1720635297554..webp",
                            "list_h5": "/image/1720635303871..webp",
                            "title_web": "/image/1720635300527..webp",
                            "title_h5": "/image/1720635306651..webp",
                            "share_h5": "",
                            "display_mode": 1
                        },
                        "id": "106435746950214411",
                        "title": "Jackpot Misterioso",
                        "state": 2,
                        "flag": "static",
                        "grade": "2027,2026,2025,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2028,2029"
                    }
                ],
                "5": [
                    {
                        "static": {
                            "list_web": "/image/1720635043790..webp",
                            "list_h5": "/image/1720635048290..webp",
                            "title_web": "/image/1705398003881.webp",
                            "title_h5": "/image/1705398015397.webp",
                            "share_h5": "/"
                        },
                        "id": "17395548563955151",
                        "title": "Recomende amigos e ganhe bônus",
                        "state": 2,
                        "flag": "invite",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028,43,2029"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635115780..webp",
                            "list_h5": "/image/1720635122137..webp",
                            "title_web": "/image/1720635118419..webp",
                            "title_h5": "/image/1720635161404..png",
                            "share_h5": ""
                        },
                        "id": "17395548563954431",
                        "title": "Bónus de primeiro depósito",
                        "state": 2,
                        "flag": "deposit",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635151133..webp",
                            "list_h5": "/image/1720635158788..webp",
                            "title_web": "/image/1720635155872..webp",
                            "title_h5": "/image/1720635161404..png",
                            "share_h5": "/1657197245034666.png"
                        },
                        "id": "17405392470691661",
                        "title": "Bônus de suporte diário de perdas",
                        "state": 2,
                        "flag": "rescue",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635182380..webp",
                            "list_h5": "/image/1720635186271..webp",
                            "title_web": "/image/1718055900849..webp",
                            "title_h5": "/image/1718055904278..webp",
                            "share_h5": "",
                            "display_mode": 2,
                            "link_url": "VIP"
                        },
                        "id": "10556736320579983",
                        "title": "VIP",
                        "state": 2,
                        "flag": "static",
                        "grade": "1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2027,2026,2025,2028"
                    },
                    // {
                    //     "static": {
                    //         "list_web": "/image/1720635202254..webp",
                    //         "list_h5": "/image/1720635208722..webp",
                    //         "title_web": "/image/1720635205414..webp",
                    //         "title_h5": "/image/1720635211906..webp",
                    //         "share_h5": "",
                    //         "display_mode": 1,
                    //         "link_url": "/agent"
                    //     },
                    //     "id": "10560896798327497",
                    //     "title": "Atividades de comissão de agentes",
                    //     "state": 2,
                    //     "flag": "static",
                    //     "grade": "2027,2026,2025,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2028"
                    // },
                    {
                        "static": {
                            "list_web": "/image/1720635297554..webp",
                            "list_h5": "/image/1720635303871..webp",
                            "title_web": "/image/1720635300527..webp",
                            "title_h5": "/image/1720635306651..webp",
                            "share_h5": "",
                            "display_mode": 1
                        },
                        "id": "106435746950214411",
                        "title": "Jackpot Misterioso",
                        "state": 2,
                        "flag": "static",
                        "grade": "2027,2026,2025,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2028,2029"
                    }
                ],
                "6": [
                    {
                        "static": {
                            "list_web": "/image/1720635043790..webp",
                            "list_h5": "/image/1720635048290..webp",
                            "title_web": "/image/1705398003881.webp",
                            "title_h5": "/image/1705398015397.webp",
                            "share_h5": "/"
                        },
                        "id": "17395548563955151",
                        "title": "Recomende amigos e ganhe bônus",
                        "state": 2,
                        "flag": "invite",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028,43,2029"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635115780..webp",
                            "list_h5": "/image/1720635122137..webp",
                            "title_web": "/image/1720635118419..webp",
                            "title_h5": "/image/1720635161404..png",
                            "share_h5": ""
                        },
                        "id": "17395548563954431",
                        "title": "Bónus de primeiro depósito",
                        "state": 2,
                        "flag": "deposit",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635151133..webp",
                            "list_h5": "/image/1720635158788..webp",
                            "title_web": "/image/1720635155872..webp",
                            "title_h5": "/image/1720635161404..png",
                            "share_h5": "/1657197245034666.png"
                        },
                        "id": "17405392470691661",
                        "title": "Bônus de suporte diário de perdas",
                        "state": 2,
                        "flag": "rescue",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635182380..webp",
                            "list_h5": "/image/1720635186271..webp",
                            "title_web": "/image/1718055900849..webp",
                            "title_h5": "/image/1718055904278..webp",
                            "share_h5": "",
                            "display_mode": 2,
                            "link_url": "VIP"
                        },
                        "id": "10556736320579983",
                        "title": "VIP",
                        "state": 2,
                        "flag": "static",
                        "grade": "1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2027,2026,2025,2028"
                    },
                    // {
                    //     "static": {
                    //         "list_web": "/image/1720635202254..webp",
                    //         "list_h5": "/image/1720635208722..webp",
                    //         "title_web": "/image/1720635205414..webp",
                    //         "title_h5": "/image/1720635211906..webp",
                    //         "share_h5": "",
                    //         "display_mode": 1,
                    //         "link_url": "/agent"
                    //     },
                    //     "id": "10560896798327497",
                    //     "title": "Atividades de comissão de agentes",
                    //     "state": 2,
                    //     "flag": "static",
                    //     "grade": "2027,2026,2025,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2028"
                    // },
                    {
                        "static": {
                            "list_web": "/image/1720635297554..webp",
                            "list_h5": "/image/1720635303871..webp",
                            "title_web": "/image/1720635300527..webp",
                            "title_h5": "/image/1720635306651..webp",
                            "share_h5": "",
                            "display_mode": 1
                        },
                        "id": "106435746950214411",
                        "title": "Jackpot Misterioso",
                        "state": 2,
                        "flag": "static",
                        "grade": "2027,2026,2025,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2028,2029"
                    }
                ],
                "7": [
                    {
                        "static": {
                            "list_web": "/image/1720635043790..webp",
                            "list_h5": "/image/1720635048290..webp",
                            "title_web": "/image/1705398003881.webp",
                            "title_h5": "/image/1705398015397.webp",
                            "share_h5": "/"
                        },
                        "id": "17395548563955151",
                        "title": "Recomende amigos e ganhe bônus",
                        "state": 2,
                        "flag": "invite",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028,43,2029"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635115780..webp",
                            "list_h5": "/image/1720635122137..webp",
                            "title_web": "/image/1720635118419..webp",
                            "title_h5": "/image/1720635161404..png",
                            "share_h5": ""
                        },
                        "id": "17395548563954431",
                        "title": "Bónus de primeiro depósito",
                        "state": 2,
                        "flag": "deposit",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635151133..webp",
                            "list_h5": "/image/1720635158788..webp",
                            "title_web": "/image/1720635155872..webp",
                            "title_h5": "/image/1720635161404..png",
                            "share_h5": "/1657197245034666.png"
                        },
                        "id": "17405392470691661",
                        "title": "Bônus de suporte diário de perdas",
                        "state": 2,
                        "flag": "rescue",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635182380..webp",
                            "list_h5": "/image/1720635186271..webp",
                            "title_web": "/image/1718055900849..webp",
                            "title_h5": "/image/1718055904278..webp",
                            "share_h5": "",
                            "display_mode": 2,
                            "link_url": "VIP"
                        },
                        "id": "10556736320579983",
                        "title": "VIP",
                        "state": 2,
                        "flag": "static",
                        "grade": "1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2027,2026,2025,2028"
                    },
                    // {
                    //     "static": {
                    //         "list_web": "/image/1720635202254..webp",
                    //         "list_h5": "/image/1720635208722..webp",
                    //         "title_web": "/image/1720635205414..webp",
                    //         "title_h5": "/image/1720635211906..webp",
                    //         "share_h5": "",
                    //         "display_mode": 1,
                    //         "link_url": "/agent"
                    //     },
                    //     "id": "10560896798327497",
                    //     "title": "Atividades de comissão de agentes",
                    //     "state": 2,
                    //     "flag": "static",
                    //     "grade": "2027,2026,2025,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2028"
                    // },
                    {
                        "static": {
                            "list_web": "/image/1720635297554..webp",
                            "list_h5": "/image/1720635303871..webp",
                            "title_web": "/image/1720635300527..webp",
                            "title_h5": "/image/1720635306651..webp",
                            "share_h5": "",
                            "display_mode": 1
                        },
                        "id": "106435746950214411",
                        "title": "Jackpot Misterioso",
                        "state": 2,
                        "flag": "static",
                        "grade": "2027,2026,2025,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2028,2029"
                    }
                ],
                "8": [
                    {
                        "static": {
                            "list_web": "/image/1720635297554..webp",
                            "list_h5": "/image/1720635303871..webp",
                            "title_web": "/image/1720635300527..webp",
                            "title_h5": "/image/1720635306651..webp",
                            "share_h5": "",
                            "display_mode": 1
                        },
                        "id": "106435746950214411",
                        "title": "Jackpot Misterioso",
                        "state": 2,
                        "flag": "static",
                        "grade": "2027,2026,2025,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2028,2029"
                    }
                ],
                "9": [
                    {
                        "static": {
                            "list_web": "/image/1720635043790..webp",
                            "list_h5": "/image/1720635048290..webp",
                            "title_web": "/image/1705398003881.webp",
                            "title_h5": "/image/1705398015397.webp",
                            "share_h5": "/"
                        },
                        "id": "17395548563955151",
                        "title": "Recomende amigos e ganhe bônus",
                        "state": 2,
                        "flag": "invite",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028,43,2029"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635115780..webp",
                            "list_h5": "/image/1720635122137..webp",
                            "title_web": "/image/1720635118419..webp",
                            "title_h5": "/image/1720635161404..png",
                            "share_h5": ""
                        },
                        "id": "17395548563954431",
                        "title": "Bónus de primeiro depósito",
                        "state": 2,
                        "flag": "deposit",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635151133..webp",
                            "list_h5": "/image/1720635158788..webp",
                            "title_web": "/image/1720635155872..webp",
                            "title_h5": "/image/1720635161404..png",
                            "share_h5": "/1657197245034666.png"
                        },
                        "id": "17405392470691661",
                        "title": "Bônus de suporte diário de perdas",
                        "state": 2,
                        "flag": "rescue",
                        "grade": "2026,2025,2024,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028"
                    },
                    {
                        "static": {
                            "list_web": "/image/1720635182380..webp",
                            "list_h5": "/image/1720635186271..webp",
                            "title_web": "/image/1718055900849..webp",
                            "title_h5": "/image/1718055904278..webp",
                            "share_h5": "",
                            "display_mode": 2,
                            "link_url": "VIP"
                        },
                        "id": "10556736320579983",
                        "title": "VIP",
                        "state": 2,
                        "flag": "static",
                        "grade": "1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2027,2026,2025,2028"
                    },
                    // {
                    //     "static": {
                    //         "list_web": "/image/1720635202254..webp",
                    //         "list_h5": "/image/1720635208722..webp",
                    //         "title_web": "/image/1720635205414..webp",
                    //         "title_h5": "/image/1720635211906..webp",
                    //         "share_h5": "",
                    //         "display_mode": 1,
                    //         "link_url": "/agent"
                    //     },
                    //     "id": "10560896798327497",
                    //     "title": "Atividades de comissão de agentes",
                    //     "state": 2,
                    //     "flag": "static",
                    //     "grade": "2027,2026,2025,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2028"
                    // },
                    {
                        "static": {
                            "list_web": "/image/1720635297554..webp",
                            "list_h5": "/image/1720635303871..webp",
                            "title_web": "/image/1720635300527..webp",
                            "title_h5": "/image/1720635306651..webp",
                            "share_h5": "",
                            "display_mode": 1
                        },
                        "id": "106435746950214411",
                        "title": "Jackpot Misterioso",
                        "state": 2,
                        "flag": "static",
                        "grade": "2027,2026,2025,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2028,2029"
                    }
                ]
            }
        }


        res.json(list_promotion_sort_json)
    }
    else {

        res.json({ "status": false, "data": "1062" }
        )
    }

}


module.exports = ListPromotionSort