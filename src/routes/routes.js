const express = require('express')
require('dotenv').config()

const Router = express.Router()

const RegisterController = require('../controllers/RegisterController/RegisterController')
const InfoUserMemberController = require('../controllers/InfoUserMemberController/InfoUserMemberController')
const MemberLinkListController = require('../controllers/MemberLinkListController/MemberLinkListController')
const MemberBalanceController = require('../controllers/MemberBalanceController/MemberBalanceController')
const ListPromotionSortController = require('../controllers/ListPromotionSortController/ListPromotionSortController')
const MemeberRecallBalanceController = require('../controllers/MemberRecallBalanceController/MemberRecallBalanceController')
const LoginController = require('../controllers/LoginController/LoginController')
const MemberSlotsSearch = require('../controllers/MemberSlotsSearchController/MemberSlotsSearchController')
const PromotionInviteController = require('../controllers/PromotionInviteController/PromotionInviteController')
const PromotionInviteOpenController = require('../controllers/PromotionInviteOpenController/PromotionInviteOpenController')
const PromotionInviteRecordDetailController = require('../controllers/PromotionInviteRecordDetailController/PromotionInviteRecordDetailController')
const memberRecordTradeController = require('../controllers/MemberRecordTradeController/MemberRecordTradeController')
const FinanceChannelTypeController = require('../controllers/FinanceChannelTypeController/FinanceChannelTypeController')
const PromotionDetails = require('../controllers/PromotionDetailsControllers/PromotionDetailsControllers')
const FinanceChannelListController = require('../controllers/FinanceChannelListController/FinanceChannelListController')
const SuitpayController = require('../controllers/PaymentGatewayController/SuitPay/SuitpayController')
const DigitoPayController = require('../controllers/PaymentGatewayController/DigitoPay/DigitoPayController')
const FinanceThirdDepositController = require('../controllers/FinanceThirdDepositController/FinanceThirdDepositController')
const MemberShortInfoController = require('../controllers/MemberShortInfoController/MemberShortInfoController')
const VerifyPaymentSuitPayController = require('../controllers/VerifyPaymentSuitPayController/VerifyPaymentSuitPayController')
const VerifyPaymentDigitoPayController = require('../controllers/VerifyPaymentSuitPayController/VerifyPaymentDigitoPayController')
const PasswordUpdateWithdrawController = require('../controllers/PasswordUpdateWithdrawController/PasswordUpdateWithdrawController')
const MemberBankCardPixtypeList = require('../controllers/MemberBankCardPixtypeListController/MemberBankCardPixtypeListController')
const FinanceWithdrawProcessingController = require('../controllers/FinanceWithdrawProcessingController/FinanceWithdrawProcessingController')
const MemberBankcardListController = require('../controllers/MemberBankcardListController/MemberBankcardListController')
const MemberWithdrawPasswordCheckController = require('../controllers/MemberWithdrawPasswordCheckController/MemberWithdrawPasswordCheckController')
const MemberBankCardInsertController = require('../controllers/MemberBankCardInsertController/MemberBankCardInsertController')
const FinanceWithdrawController = require('../controllers/FinanceWithdrawController/FinanceWithdrawController')
const memberRecordWithdrawDetailController = require('../controllers/memberRecordWithdrawDetailController/memberRecordWithdrawDetailController')
const plataformLaunchGameController = require('../controllers/PlataformLaunchGameController/PlataformLaunchGameController')
const BlackboxPlatformGameController = require('../controllers/BlackboxPlatformGameController/BlackboxPlatformGameController')
const JiutApiController = require('../API/Jiut/JiutApiController/JiutApiController')
const MemberRecordGameController = require('../controllers/MemberRecordGameController/MemberRecordGameController')
const MemberDirectAgencyBetController = require('../controllers/MemberDirectAgencyBetController/MemberDirectAgencyBetController')
const MemberRebateAgencyBriefController = require('../controllers/MemberRebateAgencyBriefController/MemberRebateAgencyBriefController')
const MemberAgentSubMemberController = require('../controllers/MemberAgentSubMemberController/MemberAgentSubMemberController')
const MemberPasswordCheckController = require('../controllers/MemberPasswordCheckController/MemberPasswordCheckController')
const MemberSlotHotGameController = require('../controllers/MemberSlotHotGameController/MemberSlotHotGameController')
const MemberSlotListController = require('../controllers/MemberSlotListController/MemberSlotListController')
const MemberHistoryDetailController = require('../controllers/MemberHistoryDetailController/MemberHistoryDetailController')

const UserBalance = require('../API/Jiut/Method/UserBalance/UserBalance')
const Transaction = require('../API/Jiut/Method/Transactions/Transactions')
const TransactionPg16 = require('../API/Jiut/Method/Transactions/TransactionPg16')
const Transaction2 = require('../API/Jiut/Method/Transactions/Transactionsprag')

const MemberEventWalletLockBonusController = require('../controllers/MemberEventWalletLockBonusController/MemberEventWalletLockBonusController')

const MemberEventWalletProgressInfoController = require('../controllers/MemberEventWalletProgressInfoController/MemberEventWalletProgressInfoController')
const knex = require('../utils/knex/config')


Router.get('/event/member/wallet/lock/bonus/progress/info', MemberEventWalletProgressInfoController.progress_lock_info)


Router.get('/event/member/wallet/lock/bonus/info', MemberEventWalletLockBonusController.member_event_wallet_lock_bonus)


Router.get('/theme/default', async (req, res) => {
    let settings = await knex('software_settings').where("id", 1).select('*').first();
    var theme = settings['theme'];
    res.json({
        theme,
    })
})

Router.get('/member/notices', async function (req, res) {
    res.json({ "status": true, "data": 1000 })
})



Router.get('/member/message/list', async function (req, res) {
    res.json({ "status": true, "data": 1000 })
})


Router.post('/member/history/save', async function (req, res) {
    res.json({ "status": true, "data": 1000 })
})


Router.get('/member/favorites/detail', async function (req, res) {


    res.json({
        "status": true,
        "data": {
            "d": null,
            "t": 0
        }
    })
})


Router.post('/gold_api/user_balance', UserBalance.userbalancegold)
Router.post('/gold_api/money_callback', UserBalance.userbalancegold)
Router.post('/gold_api/game_callback', Transaction.gamecallback)

Router.post('/pg16/gold_api/user_balance', UserBalance.userbalancegold)
Router.post('/pg16/gold_api/money_callback', UserBalance.userbalancegold)
Router.post('/pg16/gold_api/game_callback', TransactionPg16.gamecallback)
Router.post('/pg16/gold_api/trasactions', TransactionPg16.gamecallback)


Router.post('/callback', Transaction2);
Router.post('/playfiver/webhook', JiutApiController.jiut_api)
Router.post('/member/favorites/save', async (req, res) => {
    console.log(req.body)
})

Router.get('/member/history/detail', MemberHistoryDetailController.member_history_detail)



Router.get("/member/slot/list", MemberSlotListController.member_slot_list)



Router.get("/member/slot/hotgame", MemberSlotHotGameController.slot_hot_Game)



Router.post('/member/agent/sub/member', MemberAgentSubMemberController.member_agent_sub_member)



Router.post('/member/rebate/agency/report', async function (req, res) {
    res.json({ "status": true, "data": { "d": null, "t": 0 } })
})



Router.get('/member/rebate/agency/record', async function (req, res) {
    res.json({ "status": true, "data": { "d": null, "t": 0 } })
})

Router.post('/member/rebate/agency/brief', MemberRebateAgencyBriefController.member_rebate_agency_brief)



Router.post('/member/direct/agency/bet', MemberDirectAgencyBetController.member_direct_agency_Bet)


Router.get('/member/record/game', MemberRecordGameController.member_record_game)

Router.get('/plat/launch/26595015200313', plataformLaunchGameController.plataform_launch_game)
Router.get('/plat/launch/26595015200310', plataformLaunchGameController.plataform_launch_game)
Router.get('/plat/launch/26595015200316', plataformLaunchGameController.plataform_launch_game)

Router.get('/member/record/trade/detail', memberRecordWithdrawDetailController.record_withdraw_detail)

Router.post('/finance/withdraw', FinanceWithdrawController.finance_withdraw_controller)

Router.post('/member/bankcard/insert', MemberBankCardInsertController.member_bank_card_insert)

Router.post('/member/wpw/check', MemberWithdrawPasswordCheckController.member_withdraw_password_check_controller)

Router.get("/member/bankcard/list", MemberBankcardListController.member_bank_card_list_user)

Router.get('/finance/withdraw/processing', FinanceWithdrawProcessingController.finance_withdraw_processing)

Router.get('/member/bankcard/pixtypelist', MemberBankCardPixtypeList.member_bank_card_type_list)

Router.post('/member/password/update', PasswordUpdateWithdrawController.password_update_withdraw)


Router.post('/v1/verify/pay', VerifyPaymentSuitPayController.verify_payment_suitpay)
Router.post('/digito/verify/pay', VerifyPaymentDigitoPayController.verify_payment_digitopay)

Router.get('/member/short/info', MemberShortInfoController.member_shortin_info)

Router.post('/finance/third/deposit', FinanceThirdDepositController.finance_third)

Router.post('/generation/payment/suit', SuitpayController.suitpayController)

Router.post('/generation/payment/digitopay', DigitoPayController.generatePixController);

Router.post('/finance/withdraw/digitopay', DigitoPayController.withdrawController);

Router.post('/websocket/deposit/digitopay', DigitoPayController.webhookDeposit);

Router.get('/finance/channel/list', FinanceChannelListController.finance_channel_list)

Router.get('/finance/channel/type', FinanceChannelTypeController.finance_channel_type)

Router.get('/promo/detail', PromotionDetails.detail_promotion)

Router.post('/games/launch', BlackboxPlatformGameController.launchGame);

Router.post('/games/list', BlackboxPlatformGameController.listGames);

Router.post('/games/providers', BlackboxPlatformGameController.listProviders);

Router.post('/drakon_api', BlackboxPlatformGameController.webhook);

Router.get('/member/record/trade', memberRecordTradeController.member_record_trade)

Router.post('/promo/invite/record/detail', PromotionInviteRecordDetailController.invite_record_detail_promotion)

Router.post('/promo/invite/open', PromotionInviteOpenController.promotion_invite_open)

Router.post('/promo/invite/list', PromotionInviteController.promotion_invite)

Router.post('/member/slot/search', MemberSlotsSearch.slots_search)

Router.post('/member/login', LoginController.login)

Router.post('/member/recall/balance', MemeberRecallBalanceController.member_recall_balance)

Router.get('/promo/list/sort', ListPromotionSortController.list_promotion_sort)

Router.get('/member/point/statistics/deposit', async function (req, res) {
    res.json({ "status": true, "data": [] })
})

Router.get('/member/balance', MemberBalanceController.member_balance)

Router.get('/member/link/list', MemberLinkListController.member_link_list)


Router.get('/member/password/check', MemberPasswordCheckController.member_password_check)

Router.get('/member/message/num', async function (req, res) {
    res.json({ "status": true, "data": 0 })
})

Router.get('/promo/list', async function (req, res) {
    res.json({
        "status": true,
        "data": [
            {
                "static": {
                    "list_web": "/image/1720635043790..webp",
                    "list_h5": "/image/1720635048290..png",
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
                    "list_h5": "/image/1720635122137..png",
                    "title_web": "/image/1720635118419..webp",
                    "title_h5": "/image/1720635125041..png",
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
                    "list_h5": "/image/1720635158788..png",
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
                    "list_h5": "/image/1720635186271..png",
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
            {
                "static": {
                    "list_web": "/image/1720635202254..webp",
                    "list_h5": "/image/1720635208722..png",
                    "title_web": "/image/1720635205414..webp",
                    "title_h5": "/image/1720635211906..webp",
                    "share_h5": "",
                    "display_mode": 1,
                    "link_url": "/agent"
                },
                "id": "10560896798327497",
                "title": "Atividades de comissão de agentes",
                "state": 2,
                "flag": "static",
                "grade": "2027,2026,2025,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2028"
            },
            {
                "static": {
                    "list_web": "/image/1720635297554..webp",
                    "list_h5": "/image/1720635303871..png",
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
    })
})

Router.get('/promo/welfare/record', async function (req, res) {
    res.json({ "status": true, "data": { "d": [], "agg": "0" } })
})

Router.get('/member/info', InfoUserMemberController.info_user)


Router.post('/member/reg', RegisterController.register)

Router.get("/member/point/statistics", async (req, res) => {
    res.json({
        "status": true,
        "data": {
            "facebook": "",
            "kwai": "",
            "tiktok": "",
            "google": ""
        }
    })
})

Router.get("/member/nav", async (req, res) => {
    res.json({
        "status": true,
        "data": [{
            "id": 3,
            "level": "001003",
            "name": "电子",
            "sort": 1,
            "prefix": "f90",
            "l": [{
                "id": "26595015200313",
                "name": "PG Slots",
                "wallet_id": "26595015200313",
                "wallet_name": "PG",
                "game_type": 3,
                "maintained": 1,
                "maintained_start": 0,
                "maintained_end": 0,
                "flags": 3,
                "state": 1,
                "seq": 99,
                "share_wallet": 0,
                "platform_is_hot": 1
            },
            {
                "id": "26595015200316",
                "name": "AOVIVO",
                "wallet_id": "26595015200309",
                "wallet_name": "AWC",
                "sub": [
                    "26595015200316"
                ],
                "game_type": 3,
                "maintained": 1,
                "maintained_start": 0,
                "maintained_end": 0,
                "flags": 3,
                "state": 1,
                "seq": 60,
                "share_wallet": 0,
                "platform_is_hot": 1,
                "pid": "26595015200316"
            },
            {
                "id": "26595015200310",
                "name": "PP Slots",
                "wallet_id": "26595015200309",
                "wallet_name": "AWC",
                "sub": [
                    "26595015200310"
                ],
                "game_type": 3,
                "maintained": 1,
                "maintained_start": 0,
                "maintained_end": 0,
                "flags": 3,
                "state": 1,
                "seq": 58,
                "share_wallet": 0,
                "platform_is_hot": 1,
                "pid": "26595015200310"
            },
            ]
        },]
    })

})

Router.get("/member/webset/list", async (req, res) => {

    let settings = await knex('software_settings').where("id", 1).select('*').first();

    res.json({
        "status": true,
        "data": {
            "netsignal_switch": "1",
            "reg_need_phone": "1",
            "marqueeTxt": settings['marqueeTxt'],
            "deposit_img_pc": "/image/1713447112494..webp",
            "favicon_img": "/image/1720634811467..webp",
            "marqueeType": "2",
            "pool_style": "5",
            "decimalPlaces": "2",
            "pop": [
                {
                    "id": "19611940713966742",
                    "ty": "",
                    "name": "介绍图",
                    "portal": [
                        "pc",
                        "h5",
                        "app"
                    ],
                    "img": settings['pop_img_1'],
                    "link": "推广",
                    "oper": "",
                    "sway": 1,
                    "sort": 1,
                    "state": 1,
                    "op_at": 1720634923,
                    "login_bf": 1,
                    "login_af": 1
                },
                {
                    "id": "196119407139667444",
                    "ty": "",
                    "name": "介绍",
                    "portal": [
                        "pc",
                        "h5",
                        "app"
                    ],
                    "img": settings['pop_img_2'],
                    "link": "推广",
                    "oper": "",
                    "sway": 1,
                    "sort": 1,
                    "state": 1,
                    "op_at": 1720634923,
                    "login_bf": 1,
                    "login_af": 1
                },

            ],
            "guide_title": "suspensepg",
            "deposit_img_h5": "/image/1713447115699..webp",
            "pool_money_style": "1",
            "pool_forward_jump_type": "1",
            "float": [
                {
                    "id": "4701376178724616",
                    "ty": "",
                    "name": "下载",
                    "portal": [
                        "pc",
                        "h5",
                        "app"
                    ],
                    "img": settings['img_float_1'],
                    "link": "/activity/recommend-friends",
                    "oper": "",
                    "sway": 0,
                    "sort": 10,
                    "state": 1,
                    "op_at": 1717771911,
                    "login_bf": 0,
                    "login_af": 0
                },

                {
                    "id": "47013761787246177",
                    "ty": "",
                    "name": "下载",
                    "portal": [
                        "pc",
                        "h5",
                        "app"
                    ],
                    "img": settings['img_float_2'],
                    "link": "/activity/recommend-friends",
                    "oper": "",
                    "sway": 0,
                    "sort": 10,
                    "state": 1,
                    "op_at": 1717771911,
                    "login_bf": 0,
                    "login_af": 0
                }
            ],
            "group_name": settings['group_name'],
            "banner_hidden_proxy": "JmD1rER55",
            "t_fees": "[{\"id\":\"1\",\"tag_id\":\"\",\"fmin\":0,\"fmax\":20,\"amount\":0,\"flags\":1,\"updated_name\":\"lws01\",\"updated_at\":1712137324}]",
            "t_limits": "[{\"id\":\"538923381501373445\",\"tag_id\":\"0\",\"fmin\":10,\"fmax\":50000,\"updated_name\":\"lws01\",\"updated_at\":1712137324}]",
            "pool_forward_name": "/",
            "s_wdraw_fst_deptamount": "1",
            "img_shape": "1",
            "player_autoplay": "1",
            "pool_switch": "1",
            "pool_custom_style": settings['img_jackpot'],
            "register_need_name_switch": "1",
            "banner_switch": "1",
            "deposit_to": "/activity-detail/17395548563954431/deposit",
            "logo_img": settings['software_logo'],
            "pool_forward": "/",
            "pool_forward_flag": "/",
            "lang_switch": "1",
            "banner_bottom_switch": "2",
            "banner_img": settings['img_download'],
            "web_title": "china.errejota.bet",
            "pool_forward_id": "/",
            "player_switch": "1",
            "share": [
                {
                    "id": "507346558646967565",
                    "ty": "",
                    "name": "telegram",
                    "portal": [
                        ""
                    ],
                    "img": "/image/1710154436860..webp",
                    "link": settings['telegram'],
                    "oper": "",
                    "sway": 0,
                    "sort": 2,
                    "state": 1,
                    "op_at": 1710154439,
                    "login_bf": 0,
                    "login_af": 0
                },
                {
                    "id": "507347307083592702",
                    "ty": "",
                    "name": "instagram",
                    "portal": [
                        ""
                    ],
                    "img": "/image/1710154427695..webp",
                    "link": settings['instagram'],
                    "oper": "",
                    "sway": 0,
                    "sort": 3,
                    "state": 1,
                    "op_at": 1710154430,
                    "login_bf": 0,
                    "login_af": 0
                },
                {
                    "id": "507347921991100188",
                    "ty": "",
                    "name": "youtube",
                    "portal": [
                        ""
                    ],
                    "img": "/image/1710154410968..webp",
                    "link": settings['youtube'],
                    "oper": "",
                    "sway": 0,
                    "sort": 4,
                    "state": 1,
                    "op_at": 1710154412,
                    "login_bf": 0,
                    "login_af": 0
                },
                {
                    "id": "507350188537890161",
                    "ty": "",
                    "name": "whatsapp",
                    "portal": [
                        ""
                    ],
                    "img": "/image/1710154463790..webp",
                    "link": settings['whatsapp'],
                    "oper": "",
                    "sway": 0,
                    "sort": 5,
                    "state": 1,
                    "op_at": 1710154466,
                    "login_bf": 0,
                    "login_af": 0
                },
                {
                    "id": "507352469121437887",
                    "ty": "",
                    "name": "twitter",
                    "portal": [
                        ""
                    ],
                    "img": "/image/1710154447367..webp",
                    "link": settings['twitter'],
                    "oper": "",
                    "sway": 0,
                    "sort": 6,
                    "state": 1,
                    "op_at": 1718050066,
                    "login_bf": 0,
                    "login_af": 0
                },
                {
                    "id": "507353360508835083",
                    "ty": "",
                    "name": "tiktok",
                    "portal": [
                        ""
                    ],
                    "img": "/image/1710154454428..webp",
                    "link": settings['tiktok'],
                    "oper": "",
                    "sway": 0,
                    "sort": 7,
                    "state": 1,
                    "op_at": 1718050062,
                    "login_bf": 0,
                    "login_af": 0
                }
            ]
        }
    })
})

Router.get("/member/app/upgrade", async (req, res) => {
    res.json({
        "status": true,
        "data": {
            "id": "",
            "platform": "android",
            "version": "1.1.40",
            "is_force": 0,
            "content": "\n1. Otimizou algumas funções\n",
            "url": "/",
            "updated_at": 0,
            "updated_uid": "",
            "updated_name": "",
            "prefix": "",
            "model_type": 0
        }
    })
})

Router.get("/member/banner", async (req, res) => {

    let banners = await knex('banners').select('*');
    let data = [];
    banners.forEach((b, k) => {
        data.push({
            ...b,
            sort: `${k + 1}`
        })
    });


    res.json({
        "status": true,
        "data": data,
    })
})

Router.get("/member/award", async (req, res) => {
    res.json({ "status": true, "data": { "amount": 64587176659, "num": 0, "prefix": "f90" } })
})



Router.get("/member/player/list", async (req, res) => {
    res.json({
        "status": true,
        "data": {
            "d": [
                {
                    "id": "1",
                    "music_name": "U Spin Me Round",
                    "size": "167000",
                    "src": "/br-music/c124ed93-427d-43de-8370-ea786c54907c.mp3",
                    "sort": 0,
                    "status": 0,
                    "update_name": "",
                    "update_at": 0,
                    "create_at": 0
                },
                {
                    "id": "2",
                    "music_name": "Yesterday-The Beatles",
                    "size": "367000",
                    "src": "/br-music/49ba9a13-f1a1-4a4a-a49b-8a97535f5862.mp3",
                    "sort": 0,
                    "status": 0,
                    "update_name": "",
                    "update_at": 0,
                    "create_at": 0
                },
                {
                    "id": "3",
                    "music_name": "See You Again-Wiz+Khalifa",
                    "size": "371000",
                    "src": "/br-music/e59437b6-42ea-4d31-9c01-b2fa0a7ea93a.mp3",
                    "sort": 0,
                    "status": 0,
                    "update_name": "",
                    "update_at": 0,
                    "create_at": 0
                },
                {
                    "id": "4",
                    "music_name": "Without You-Mariah Carey",
                    "size": "94000",
                    "src": "/br-music/18027e41-8cd1-4dc7-b6fa-1b6381f2e5eb.mp3",
                    "sort": 0,
                    "status": 0,
                    "update_name": "",
                    "update_at": 0,
                    "create_at": 0
                },
                {
                    "id": "5",
                    "music_name": "Live It Up",
                    "size": "325000",
                    "src": "/br-music/26b8a64b-80ab-42d2-bfbe-e5f444808428.mp3",
                    "sort": 0,
                    "status": 0,
                    "update_name": "",
                    "update_at": 0,
                    "create_at": 0
                },
                {
                    "id": "6",
                    "music_name": "Waiting for Love",
                    "size": "359000",
                    "src": "/br-music/02730ce0-104b-43e9-82e1-d6bc8f4cde7e.mp3",
                    "sort": 0,
                    "status": 0,
                    "update_name": "",
                    "update_at": 0,
                    "create_at": 0
                },
                {
                    "id": "7",
                    "music_name": "Wait Wait Wait",
                    "size": "329000",
                    "src": "/br-music/3d30e99d-da8f-47e9-a33b-4c643479fd5f.mp3",
                    "sort": 0,
                    "status": 0,
                    "update_name": "",
                    "update_at": 0,
                    "create_at": 0
                },
                {
                    "id": "8",
                    "music_name": "Victory-anonymous",
                    "size": "507000",
                    "src": "/br-music/2ec53ebe-570b-4ea3-a4bc-aafe0dc1b593.mp3",
                    "sort": 0,
                    "status": 0,
                    "update_name": "",
                    "update_at": 0,
                    "create_at": 0
                },
                {
                    "id": "9",
                    "music_name": "The Nights(Remix)",
                    "size": "302000",
                    "src": "/br-music/4e6d34bc-8e6b-4ae5-a23c-29a0d8139feb.mp3",
                    "sort": 0,
                    "status": 0,
                    "update_name": "",
                    "update_at": 0,
                    "create_at": 0
                },
                {
                    "id": "10",
                    "music_name": "The Fox",
                    "size": "340000",
                    "src": "/br-music/0e9af1c6-8f15-40b8-bd37-194765f1f2a8.mp3",
                    "sort": 0,
                    "status": 0,
                    "update_name": "",
                    "update_at": 0,
                    "create_at": 0
                },
                {
                    "id": "11",
                    "music_name": "The Days",
                    "size": "370000",
                    "src": "/br-music/4c59ecf8-b801-417b-b83c-eed66dd4caf9.mp3",
                    "sort": 0,
                    "status": 0,
                    "update_name": "",
                    "update_at": 0,
                    "create_at": 0
                },
                {
                    "id": "12",
                    "music_name": "Paris",
                    "size": "346000",
                    "src": "/br-music/9b86b287-9abf-4ea0-b9ef-5b06e2f5b5e4.mp3",
                    "sort": 0,
                    "status": 0,
                    "update_name": "",
                    "update_at": 0,
                    "create_at": 0
                },
                {
                    "id": "13",
                    "music_name": "Something Just Like This",
                    "size": "387000",
                    "src": "/br-music/9590805d-b284-429f-adae-3d03f01f4ecd.mp3",
                    "sort": 0,
                    "status": 0,
                    "update_name": "",
                    "update_at": 0,
                    "create_at": 0
                },
                {
                    "id": "14",
                    "music_name": "That Girl",
                    "size": "283000",
                    "src": "/br-music/44d4f8c2-1ab4-42dd-b53f-3d79cbc9cd7f.mp3",
                    "sort": 0,
                    "status": 0,
                    "update_name": "",
                    "update_at": 0,
                    "create_at": 0
                },
                {
                    "id": "15",
                    "music_name": "Bad Blood ft. Kendrick Lamar",
                    "size": "383000",
                    "src": "/br-music/e483c3e9-c3d5-4d38-aba4-18c9ecd6b1eb.mp3",
                    "sort": 0,
                    "status": 0,
                    "update_name": "",
                    "update_at": 0,
                    "create_at": 0
                },
                {
                    "id": "16",
                    "music_name": "Blank Space",
                    "size": "426000",
                    "src": "/br-music/e89598be-9c8b-4980-8211-45e2a9f95832.mp3",
                    "sort": 0,
                    "status": 0,
                    "update_name": "",
                    "update_at": 0,
                    "create_at": 0
                },
                {
                    "id": "17",
                    "music_name": "Soviet March",
                    "size": "272000",
                    "src": "/br-music/2aa9db45-311f-4f05-8854-58e3da05b6cc.mp3",
                    "sort": 0,
                    "status": 0,
                    "update_name": "",
                    "update_at": 0,
                    "create_at": 0
                },
                {
                    "id": "18",
                    "music_name": "Something Just Like This",
                    "size": "323000",
                    "src": "/br-music/585a0cf-c921-4601-a4f2-02faaa9d6bd1.mp3",
                    "sort": 0,
                    "status": 0,
                    "update_name": "",
                    "update_at": 0,
                    "create_at": 0
                },
                {
                    "id": "19",
                    "music_name": "Someone Like You",
                    "size": "445000",
                    "src": "/br-music/6157b87b-d146-4d44-83c6-bc3a773dd07f.mp3",
                    "sort": 0,
                    "status": 0,
                    "update_name": "",
                    "update_at": 0,
                    "create_at": 0
                },
                {
                    "id": "20",
                    "music_name": "Skin",
                    "size": "383000",
                    "src": "/br-music/bbe85abf-727e-495d-894d-7d4f78c730c1.mp3",
                    "sort": 0,
                    "status": 0,
                    "update_name": "",
                    "update_at": 0,
                    "create_at": 0
                }
            ],
            "t": 31,
            "config": {
                "player_switch": 1,
                "player_autoplay": 0
            }
        }
    })
})
Router.get("/promo/welfare/getconf", async (req, res) => {
    res.json({
        "status": true,
        "data": {
            "entrance": "2,1",
            "limited": ",3,4",
            "pick": "1",
            "login_before": "",
            "login_after": "",
            "flow_multiple": "1",
            "is_audit": 1
        }
    })
})

Router.get("/promo/list", async (req, res) => {
    res.json({
        "status": true,
        "data": [
            {
                "static": {
                    "list_web": "/image/1720635043790..webp",
                    "list_h5": "/image/1720635048290..png",
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
                    "list_h5": "/image/1720635122137..png",
                    "title_web": "/image/1720635118419..webp",
                    "title_h5": "/image/1720635125041..png",
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
                    "list_h5": "/image/1720635158788..png",
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
                    "list_h5": "/image/1720635186271..png",
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
            {
                "static": {
                    "list_web": "/image/1720635202254..webp",
                    "list_h5": "/image/1720635208722..png",
                    "title_web": "/image/1720635205414..webp",
                    "title_h5": "/image/1720635211906..webp",
                    "share_h5": "",
                    "display_mode": 1,
                    "link_url": "/agent"
                },
                "id": "10560896798327497",
                "title": "Atividades de comissão de agentes",
                "state": 2,
                "flag": "static",
                "grade": "2027,2026,2025,1009,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,1001,1002,1003,1004,1005,1006,1007,1008,2024,2028"
            },
            {
                "static": {
                    "list_web": "/image/1720635297554..webp",
                    "list_h5": "/image/1720635303871..png",
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
    })
})

Router.get("/member/customer/list", async (req, res) => {
    res.json({
        "status": true,
        "data": [
            {
                "id": "4",
                "title": "Whatsapp",
                "im": "/image/1712943324533.webp",
                "flag": 1,
                "sort": 3,
                "createdAt": 0,
                "updatedAt": 0,
                "items": [
                    {
                        "id": "481783378761001989",
                        "imId": "4",
                        "im": "/image/1712943324533.webp",
                        "name": "Apoio online 24/7",
                        "link": "https://tawk.to/chat/66b41d360cca4f8a7a72e693/1i4np477a",
                        "remark": "Serviço ao cliente disponível para ajudar a solucionar problemas e responder a dúvidas apresentadas.",
                        "flag": 1,
                        "sort": 0,
                        "status": 2,
                        "method": 0,
                        "createdAt": 0,
                        "updatedAt": 1720714230
                    }
                ]
            }
        ]
    })
})



Router.get("/member/marquee", async (req, res) => {
    res.json({ "status": true, "data": [] })
})

Router.get("/promo/welfare/config", async (req, res) => {

    res.json({
        "status": true,
        "data": []
    })
})



Router.get('/member/rebate/config', async function (req, res) {
 

    res.json({
        "status": true,
        "data": [

        ]
    })
})

Router.get('/member/vip/config', async function (req, res) {


    res.json({
        "status": true,
        "data": [
            {
                "id": "0",
                "level": 0,
                "level_name": "VIP0",
                "recharge_num": 0,
                "upgrade_deposit": 0,
                "upgrade_record": 0,
                "relegation_flowing": 0,
                "upgrade_gift": 0,
                "birth_gift": 0,
                "withdraw_count": 100,
                "withdraw_max": 500000,
                "early_month_packet": 0,
                "late_month_packet": 0,
                "created_at": 0,
                "updated_at": 1721110368,
                "user_count": 8271,
                "remark": "",
                "flow_multiple": 1
            },
            {
                "id": "1",
                "level": 1,
                "level_name": "VIP1",
                "recharge_num": 0,
                "upgrade_deposit": 0,
                "upgrade_record": 1000,
                "relegation_flowing": 0,
                "upgrade_gift": 1,
                "birth_gift": 0,
                "withdraw_count": 100,
                "withdraw_max": 500000,
                "early_month_packet": 0,
                "late_month_packet": 0,
                "created_at": 0,
                "updated_at": 1721110385,
                "user_count": 125,
                "remark": "",
                "flow_multiple": 1
            },
            {
                "id": "2",
                "level": 2,
                "level_name": "VIP2",
                "recharge_num": 0,
                "upgrade_deposit": 0,
                "upgrade_record": 2000,
                "relegation_flowing": 0,
                "upgrade_gift": 3,
                "birth_gift": 0,
                "withdraw_count": 100,
                "withdraw_max": 500000,
                "early_month_packet": 0,
                "late_month_packet": 0,
                "created_at": 0,
                "updated_at": 1721110391,
                "user_count": 50,
                "remark": "",
                "flow_multiple": 1
            },
            {
                "id": "3",
                "level": 3,
                "level_name": "VIP3",
                "recharge_num": 0,
                "upgrade_deposit": 0,
                "upgrade_record": 5000,
                "relegation_flowing": 0,
                "upgrade_gift": 7,
                "birth_gift": 0,
                "withdraw_count": 100,
                "withdraw_max": 1000000,
                "early_month_packet": 0,
                "late_month_packet": 0,
                "created_at": 0,
                "updated_at": 1721110396,
                "user_count": 15,
                "remark": "",
                "flow_multiple": 1
            },
            {
                "id": "4",
                "level": 4,
                "level_name": "VIP4",
                "recharge_num": 0,
                "upgrade_deposit": 0,
                "upgrade_record": 10000,
                "relegation_flowing": 0,
                "upgrade_gift": 17,
                "birth_gift": 0,
                "withdraw_count": 100,
                "withdraw_max": 1000000,
                "early_month_packet": 0,
                "late_month_packet": 0,
                "created_at": 0,
                "updated_at": 1721110402,
                "user_count": 5,
                "remark": "",
                "flow_multiple": 1
            },
            {
                "id": "5",
                "level": 5,
                "level_name": "VIP5",
                "recharge_num": 0,
                "upgrade_deposit": 0,
                "upgrade_record": 30000,
                "relegation_flowing": 0,
                "upgrade_gift": 37,
                "birth_gift": 0,
                "withdraw_count": 100,
                "withdraw_max": 1000000,
                "early_month_packet": 0,
                "late_month_packet": 0,
                "created_at": 0,
                "updated_at": 1721110407,
                "user_count": 3,
                "remark": "",
                "flow_multiple": 1
            },
            {
                "id": "6",
                "level": 6,
                "level_name": "VIP6",
                "recharge_num": 0,
                "upgrade_deposit": 0,
                "upgrade_record": 50000,
                "relegation_flowing": 0,
                "upgrade_gift": 77,
                "birth_gift": 0,
                "withdraw_count": 100,
                "withdraw_max": 1000000,
                "early_month_packet": 0,
                "late_month_packet": 0,
                "created_at": 0,
                "updated_at": 1721110411,
                "user_count": 5,
                "remark": "",
                "flow_multiple": 1
            },
            {
                "id": "7",
                "level": 7,
                "level_name": "VIP7",
                "recharge_num": 0,
                "upgrade_deposit": 0,
                "upgrade_record": 100000,
                "relegation_flowing": 0,
                "upgrade_gift": 177,
                "birth_gift": 0,
                "withdraw_count": 100,
                "withdraw_max": 1000000,
                "early_month_packet": 0,
                "late_month_packet": 0,
                "created_at": 0,
                "updated_at": 1721112935,
                "user_count": 0,
                "remark": "",
                "flow_multiple": 1
            },
            {
                "id": "8",
                "level": 8,
                "level_name": "VIP8",
                "recharge_num": 0,
                "upgrade_deposit": 0,
                "upgrade_record": 300000,
                "relegation_flowing": 0,
                "upgrade_gift": 277,
                "birth_gift": 0,
                "withdraw_count": 100,
                "withdraw_max": 1000000,
                "early_month_packet": 0,
                "late_month_packet": 0,
                "created_at": 0,
                "updated_at": 1718052230,
                "user_count": 1,
                "remark": "",
                "flow_multiple": 1
            },
            {
                "id": "9",
                "level": 9,
                "level_name": "VIP9",
                "recharge_num": 0,
                "upgrade_deposit": 0,
                "upgrade_record": 500000,
                "relegation_flowing": 0,
                "upgrade_gift": 577,
                "birth_gift": 0,
                "withdraw_count": 100,
                "withdraw_max": 1000000,
                "early_month_packet": 0,
                "late_month_packet": 0,
                "created_at": 0,
                "updated_at": 1718052260,
                "user_count": 0,
                "remark": "",
                "flow_multiple": 1
            },
            {
                "id": "10",
                "level": 10,
                "level_name": "VIP10",
                "recharge_num": 0,
                "upgrade_deposit": 0,
                "upgrade_record": 700000,
                "relegation_flowing": 0,
                "upgrade_gift": 777,
                "birth_gift": 0,
                "withdraw_count": 100,
                "withdraw_max": 1000000,
                "early_month_packet": 0,
                "late_month_packet": 0,
                "created_at": 0,
                "updated_at": 1718052287,
                "user_count": 0,
                "remark": "",
                "flow_multiple": 1
            },
            {
                "id": "11",
                "level": 11,
                "level_name": "VIP11",
                "recharge_num": 0,
                "upgrade_deposit": 0,
                "upgrade_record": 1000000,
                "relegation_flowing": 0,
                "upgrade_gift": 1377,
                "birth_gift": 0,
                "withdraw_count": 100,
                "withdraw_max": 1000000,
                "early_month_packet": 0,
                "late_month_packet": 0,
                "created_at": 0,
                "updated_at": 1718052305,
                "user_count": 1,
                "remark": "",
                "flow_multiple": 1
            },
            {
                "id": "12",
                "level": 12,
                "level_name": "VIP12",
                "recharge_num": 0,
                "upgrade_deposit": 0,
                "upgrade_record": 30000000,
                "relegation_flowing": 0,
                "upgrade_gift": 3777,
                "birth_gift": 0,
                "withdraw_count": 100,
                "withdraw_max": 1000000,
                "early_month_packet": 0,
                "late_month_packet": 0,
                "created_at": 0,
                "updated_at": 1718052319,
                "user_count": 0,
                "remark": "",
                "flow_multiple": 1
            },
            {
                "id": "13",
                "level": 13,
                "level_name": "VIP13",
                "recharge_num": 0,
                "upgrade_deposit": 0,
                "upgrade_record": 50000000,
                "relegation_flowing": 0,
                "upgrade_gift": 7777,
                "birth_gift": 0,
                "withdraw_count": 100,
                "withdraw_max": 1000000,
                "early_month_packet": 0,
                "late_month_packet": 0,
                "created_at": 0,
                "updated_at": 1718052335,
                "user_count": 0,
                "remark": "",
                "flow_multiple": 1
            },
            {
                "id": "14",
                "level": 14,
                "level_name": "VIP14",
                "recharge_num": 0,
                "upgrade_deposit": 0,
                "upgrade_record": 10000000,
                "relegation_flowing": 0,
                "upgrade_gift": 17777,
                "birth_gift": 0,
                "withdraw_count": 100,
                "withdraw_max": 1000000,
                "early_month_packet": 0,
                "late_month_packet": 0,
                "created_at": 0,
                "updated_at": 1718052350,
                "user_count": 0,
                "remark": "",
                "flow_multiple": 1
            },
            {
                "id": "15",
                "level": 15,
                "level_name": "VIP15",
                "recharge_num": 0,
                "upgrade_deposit": 0,
                "upgrade_record": 50000000,
                "relegation_flowing": 0,
                "upgrade_gift": 77777,
                "birth_gift": 0,
                "withdraw_count": 0,
                "withdraw_max": 0,
                "early_month_packet": 0,
                "late_month_packet": 0,
                "created_at": 0,
                "updated_at": 1717771461,
                "user_count": 490,
                "remark": "",
                "flow_multiple": 1
            }
        ]
    })
})



Router.get('/finance/withdraw/fee', async function (req, res) {

    res.json({
        "status": true,
        "data": [
            {
                "id": "",
                "tag_id": "",
                "fmin": 0,
                "fmax": 20,
                "amount": 0,
                "flags": 1,
                "updated_name": "",
                "updated_at": 0
            }
        ]
    })

})
module.exports = Router