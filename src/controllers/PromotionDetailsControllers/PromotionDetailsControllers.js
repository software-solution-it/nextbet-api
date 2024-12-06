const selectPromotionDetailDepositRules = require('../../model/Mysq/Select/SelectPromotionDetailDepositRules/SelectPromotionDetailDepositRules')
const SelectPromotionDetailRescueRules = require('../../model/Mysq/Select/SelectPromotionDetailRescueRules/SelectPromotionDetailRescueRules')

exports.detail_promotion = async function (req, res)
{

    const body = req.query

    const flag = body.flag

    const id = body.id
    console.log(body)

    if (flag === "deposit") 
    {
     
        res.json({
            "status": true,
            "data": {
                "static": {
                    "list_web": "/image/1720635115780..webp",
                    "list_h5": "/image/1720635122137..webp",
                    "title_web": "/image/1720635118419..webp",
                    "title_h5": "/image/1720635161404..png",
                    "share_h5": ""
                },
                "rules": {
                    "1": await selectPromotionDetailDepositRules()
                },
                "config": {
                    "title": "Bónus de primeiro depósito",
                    "web_content": [
                        "/image/1714236297468..webp",
                        "/image/1714236299826..webp",
                        "/image/1714236302410..webp",
                        "/image/1714236307462..webp"
                    ],
                    "content_text": [
                        "Exclusivo para a primeira recarga, as maiores recompensas estão esperando por você para coletar"
                    ],
                    "rule_text": [
                        "1. primeiro recarregamento de conta exclusivo, apenas uma oportunidade, quanto mais recarregar, mais recompensas, a recompensa máxima 3.777,00",
                        "2.recarregar de forma ilimitada, espera-se que as recompensas sejam actualizadas em 10 minutos, aguarde a emissão das recompensas.",
                        "3. recompensas só podem ser coletadas após 00:00:00 hoje, apenas em iOS, Android, H5, PC para coletar manualmente.",
                        "4. 1 dia após o final de cada ciclo, a recompensa expirará e a data de validade será cancelada diretamente.",
                        "5) O bónus (bónus + capital) atribuído nesta atividade requer 1,00 vezes a aposta efectiva para levantar dinheiro, as apostas não estão limitadas à plataforma de jogo;",
                        "6) Esta atividade limita-se à própria conta para realizar operações humanas normais, proibir o aluguer, a utilização de plug-ins, robôs, apostas em contas diferentes, escovas mútuas, arbitragem, interfaces, acordos, utilização de lacunas, controlo de grupo ou outros meios técnicos para participar, ou será cancelada ou deduzida a recompensa, congelada e até colocada na lista negra;",
                        "7) A fim de evitar divergências na compreensão do texto, a plataforma reserva-se o direito de interpretação final desta atividade;"
                    ],
                    "h5_content": [
                        "/image/1714236314568..webp",
                        "/image/1714236316692..webp",
                        "/image/1714236318988..webp",
                        "/image/1714236322299..webp"
                    ],
                    "sort": 2,
                    "period": 2,
                    "flag": "deposit",
                    "is_manual": 1,
                    "show_time": "2024-02-01 01:30:45",
                    "hide_time": "2032-12-31 23:59:59",
                    "activity_time": "",
                    "end_time": "2032-12-31 23:59:59",
                    "platforms": [
                        "26595015200313",
                        "26595015200305"
                    ],
                    "bonus_type": 1,
                    "grade_list": "2026,2025,2024,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2027,2028",
                    "start_time": "2024-02-01 00:00:00",
                    "lv": 1
                },
                "deposit_manual": 1
            }
        })
    }
    else if (flag === "rescue") {
        res.json({
            "status": true,
            "data": {
                "static": {
                    "list_web": "/image/1720635151133..webp",
                    "list_h5": "/image/1720635158788..webp",
                    "title_web": "/image/1720635155872..webp",
                    "title_h5": "/image/1720635161404..png",
                    "share_h5": "/1657197245034666.png"
                },
                "rules": await SelectPromotionDetailRescueRules(),
                "config": {
                    "title": "Bônus de suporte diário de perdas",
                    "web_content": [
                        "/image/1714236349962..webp",
                        "/image/1714236352776..webp"
                    ],
                    "h5_content": [
                        "/image/1714236340653..webp",
                        "/image/1714236344407..webp"
                    ],
                    "sort": 3,
                    "period": 2,
                    "flag": "rescue",
                    "show_time": "2024-02-01 01:38:37",
                    "hide_time": "2032-12-31 23:59:59",
                    "activity_time": "",
                    "end_time": "2032-12-31 23:59:59",
                    "platforms": [
                        "26595015200313",
                        "26595015200305"
                    ],
                    "rule_text": [
                        "Se, infelizmente, todos os membros perderam ontem, o site irá apoiá-lo com bônus generosos hoje para ajudá-lo a se recuperar. ",
                        "Não hesite mais,convide seus amigos para participar e aproveitar esta ofertaemocionante!",
                        "Horário de envio do bônus: A partir da 1h do dia seguinte, cadastre-se para recebé-I"
                    ],
                    "start_time": "2024-02-01 00:00:00"
                },
                "deposit_manual": 1
            }
        })
    }

    // agent até 2% perca
    else if (flag === "static" && id ==="10560896798327497")

    {
        res.json({
            "status": true,
            "data": {
                "static": {
                    "list_web": "/image/1720635202254..webp",
                    "list_h5": "/image/1720635208722..webp",
                    "title_web": "/image/1720635205414..webp",
                    "title_h5": "/image/1720635211906..webp",
                    "share_h5": "",
                    "display_mode": 1,
                    "link_url": "/agent"
                },
                "rules": {},
                "config": {
                    "title": "Atividades de comissão de agentes",
                    "web_content": [
                        "/image/1720635221215..webp"
                    ],
                    "h5_content": [
                        "/image/1720635224814..webp"
                    ],
                    "sort": 6,
                    "period": 2,
                    "is_show": 2,
                    "flag": "static",
                    "show_time": "2024-06-10 00:00:00",
                    "hide_time": "2032-12-31 23:59:59",
                    "activity_time": "",
                    "end_time": "2032-12-31 23:59:59",
                    "start_time": "2024-06-10 00:00:00"
                },
                "deposit_manual": 1
            }
        })
    }
    // jackpot misterioso
    else if(flag === 'static' && id === "106435746950214411")
    {
        res.json({
            "status": true,
            "data": {
                "static": {
                    "list_web": "/image/1720635297554..webp",
                    "list_h5": "/image/1720635303871..webp",
                    "title_web": "/image/1720635300527..webp",
                    "title_h5": "/image/1720635306651..webp",
                    "share_h5": "",
                    "display_mode": 1,
                    "link_url": ""
                },
                "rules": {},
                "config": {
                    "title": "Jackpot Misterioso",
                    "web_content": [
                        "/image/1720635319745..webp"
                    ],
                    "h5_content": [
                        "/image/1720635323348..webp"
                    ],
                    "sort": 6,
                    "period": 2,
                    "is_show": 1,
                    "flag": "static",
                    "show_time": "2024-06-10 00:00:00",
                    "hide_time": "2032-12-31 23:59:59",
                    "activity_time": "",
                    "end_time": "2032-12-31 23:59:59",
                    "start_time": "2024-06-10 00:00:00"
                },
                "deposit_manual": 1
            }
        })
    }
}