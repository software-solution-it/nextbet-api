const knex = require('../../../utils/knex/config')

async function SelectTokenUser(token) 
{


    try {
        // Busca o usuário pelo token e retorna apenas o campo 'username'
        const user = await knex('users')
            .select('username') // Seleciona apenas o campo 'username'
            .where('token_auth', token) // Filtra pelo campo de token
            .first(); // Retorna o primeiro resultado encontrado

        // Retorna o username encontrado ou null se não encontrado
        return user ? user.username : null;
    } catch (error) {
        console.log('Erro ao selecionar o usuário em SelectTokenUser: ', error);
        return null; // Retorna null em caso de erro
    }
}


module.exports = SelectTokenUser