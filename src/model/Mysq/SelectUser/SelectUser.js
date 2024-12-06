const knex = require('../../../utils/knex/config');

async function SelectUserJS(identifier, type) {
  try {
    const validTypes = ['id', 'username', 'email', 'cpf'];
    if (!validTypes.includes(type)) {
      throw new Error("Parâmetro 'type' inválido. Deve ser 'id', 'username', 'email' ou 'cpf'.");
    }

    let userQuery = knex('users').select('*');

    if (type === 'id') {
      userQuery = userQuery.where('id', identifier);
    } else if (type === 'username') {
      userQuery = userQuery.where('username', identifier);
    } else if (type === 'email') {
      userQuery = userQuery.where('email', identifier);
    } else if (type === 'cpf') {
      userQuery = userQuery.where('cpf', identifier);
    }

    const user = await userQuery.first();

    return user;
  } catch (error) {
    console.error('Erro ao buscar usuário: ', error);
    return null;
  }
}

module.exports = SelectUserJS;
