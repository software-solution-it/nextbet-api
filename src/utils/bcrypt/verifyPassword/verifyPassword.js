const bcrypt = require('bcrypt');


async function verifyPassword(password, hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
}

module.exports = verifyPassword
