const knex = require('../../../utils/knex/config')

async function SelectTokenUser(token) 
{


    try 
    {
        // console.log('token: ', token)
      
            let user = await knex('users').select('*').where('token_auth', token).first()

            return user
    }
     
    catch (error) 
    {
        console.log('error select user SelectTokenUser : ', error)

        return 100
    }
}


module.exports = SelectTokenUser