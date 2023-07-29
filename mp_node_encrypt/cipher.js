const { promisify } = require('util');
const scrypt = promisify(require('crypto').scrypt);
const randomBytes = promisify(require('crypto').randomBytes);
const { createCipheriv, createDecipheriv } = require('crypto');
const { createHmac } = require('crypto');
const { ENCRYPT_SALT, HASH_SALT, ALGORITHM } = require('./constants');

function createHash(text, salt) {
  return createHmac('sha512', salt)
    .update(text)
    .digest('hex');
}

async function createEncryptedMessage(fileContent, password) {
  const key = await scrypt(password, ENCRYPT_SALT, 24);
  const iv = await randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(fileContent, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  const hmac = createHash(fileContent, HASH_SALT);
  return {
    encrypted,
    iv: iv.toString('hex'),
    hmac,
  };
}

async function decryptMessage(fileContent, password) {
  const { encrypted, iv: ivHex, hmac } = JSON.parse(fileContent);
  const key = await scrypt(password, ENCRYPT_SALT, 24);
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  const newHmac = createHash(decrypted, HASH_SALT);
  if (newHmac !== hmac) {
    throw new Error('Hmac is incorrect');
  }
  return decrypted;
}

module.exports = {
  createEncryptedMessage,
  decryptMessage,
};
