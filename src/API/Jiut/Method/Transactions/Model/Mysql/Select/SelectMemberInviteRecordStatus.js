const knex = require('../../../../../../../utils/knex/config')

async function SelectMemberInviteRecordStatus(username) {

    try {

        let recor_invite = await knex('promotion_invite_record').select('*').where('username', username).first()

        return recor_invite
    } catch (error) {
        console.log('error SelectMemberInviteRecordStatus: ', error)

        return 100
    }

}

module.exports = SelectMemberInviteRecordStatus