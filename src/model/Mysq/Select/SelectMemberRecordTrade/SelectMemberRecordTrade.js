const knex = require('../../../../utils/knex/config');
const moment = require('moment-timezone');

async function MemberRecordTrade(page, page_size, flag, username, startTime, endTime) {
    console.log(flag)
    console.log(username)
    try {
        if (!Number.isInteger(page)) {
            page = parseInt(page, 10);
        }
        if (!Number.isInteger(page_size)) {
            page_size = parseInt(page_size, 10);
        }

        const offset = (page - 1) * page_size;

        if (!username || flag === undefined) {
            throw new Error("Username and flag must be provided");
        }

        if (flag === 271) {
            const startTimestamp = moment.tz(startTime, "America/Sao_Paulo").unix();
            const endTimestamp = moment.tz(endTime, "America/Sao_Paulo").unix();

            const data = await knex('member_record_trade')
                .select('*')
                .limit(page_size)
                .offset(offset)
                .where('username', username)
                .andWhere('flag', flag)
                .whereBetween('created_at', [startTimestamp, endTimestamp]);

            // console.log(data)

            return data;
        }
        else if (flag === 274) {

            const startTimestamp = moment.tz(startTime, "America/Sao_Paulo").unix();
            const endTimestamp = moment.tz(endTime, "America/Sao_Paulo").unix();

            const data = await knex('promotion_reward_record')
                .select('*')
                .limit(page_size)
                .offset(offset)
                .where('username', username)
                .andWhere('flag', flag)
                .whereBetween('created_at', [startTimestamp, endTimestamp]);

            return data;
        }

        // 272 flag 72 é de retirada

        else if (flag === 272) {
            const startTimestamp = moment.tz(startTime, "America/Sao_Paulo").unix();
            const endTimestamp = moment.tz(endTime, "America/Sao_Paulo").unix();

            const data = await knex('member_record_trade')
                .select('*')
                .limit(page_size)
                .offset(offset)
                .where('username', username)
                .andWhere('flag', flag)
                .whereBetween('created_at', [startTimestamp, endTimestamp]);


            return data;
        }

    } catch (error) {
        console.log('error MemberRecordTrade:', error);
        return 100;
    }
}

module.exports = MemberRecordTrade;
