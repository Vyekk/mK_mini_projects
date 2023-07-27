const { promisify } = require('util');
const scrypt = promisify(require('crypto').scrypt);
const randomBytes = promisify(require('crypto').randomBytes);
const { createCipheriv, createDecipheriv } = require('crypto');

const ALGORITHM = 'aes-192-cbc';
const SALT =
  'NASJKHJD*g827y581hjbIUGAS*&FDGY*ASUG*&FGVFBASJIn92hjnknmk#%!@#$(I*Y&! TYjkandkjasnd278Y&*YH@h@#%!&%%(!@&^&*!@%*G!@U(HBIBbasidbasdh9124yhb&@YUG@B%BVy812g';

async function createEncryptedMessage(fileContent, password) {
  const key = await scrypt(password, SALT, 24);
  const iv = await randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(fileContent, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return {
    encrypted,
    iv: iv.toString('hex'),
  };
}

async function decryptMessage(fileContent, password) {
  const { encrypted, iv: ivHex } = JSON.parse(fileContent);
  const key = await scrypt(password, SALT, 24);
  const iv = Buffer.from(ivHex, 'hex');

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}

module.exports = {
  createEncryptedMessage,
  decryptMessage,
};
