const crypto = require('crypto');

async function generateUniqueToken(length = 15) {
    let token = '';
    const characters = '0123456789';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters[randomIndex];
    }
  
    return '0'+token;
  
}

module.exports = generateUniqueToken