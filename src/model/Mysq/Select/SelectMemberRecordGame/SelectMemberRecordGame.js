const knex = require('../../../../utils/knex/config')
const moment = require('moment-timezone');

async function SelectMemberRecordGame(page, page_size, username, startTime, endTime) {

    try {
        if (!Number.isInteger(page)) {
            page = parseInt(page, 10);
        }
        if (!Number.isInteger(page_size)) {
            page_size = parseInt(page_size, 10);
        }
        const offset = (page - 1) * page_size;

        const startTimestamp = moment.tz(startTime, "America/Sao_Paulo").unix();
        const endTimestamp = moment.tz(endTime, "America/Sao_Paulo").unix();

        const data = await knex('member_record_game')
            .select('*')
            // .limit(page_size)
            // .offset(offset)
            .where('name', username)
            .whereBetween('bet_time', [startTimestamp, endTimestamp]);

        return data;


    } catch (error) {
        console.log('error SelectMemberRecordGame: ', error)

        return 100
    }

}

module.exports = SelectMemberRecordGame