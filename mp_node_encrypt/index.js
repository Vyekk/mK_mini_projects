const { writeFile } = require('fs').promises;
const { promisify } = require('util');
const scrypt = promisify(require('crypto').scrypt);
const randomBytes = promisify(require('crypto').randomBytes);
const { createCipheriv } = require('crypto');

const ALGORITHM = 'aes-192-cbc';
const USER_PATH = process.argv[2];
const USER_PASSWORD = process.argv[3];

async function createEncryptedMessage(password, algorithm) {
  const key = await scrypt(
    password,
    'NASJKHJD*g827y581hjbIUGAS*&FDGY*ASUG*&FGVFBASJIn92hjnknmk#%!@#$(I*Y&! TYjkandkjasnd278Y&*YH@h@#%!&%%(!@&^&*!@%*G!@U(HBIBbasidbasdh9124yhb&@YUG@B%BVy812g',
    24,
  );
  const iv = await randomBytes(16);
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update('Tajna wiadomość 1234', 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return {
    encrypted,
    iv: iv.toString('hex'),
  };
}

async function addEncryptedFile(path, password, algorithm) {
  const encryptedMessage = await createEncryptedMessage(password, algorithm);
  await writeFile(path, JSON.stringify(encryptedMessage));
}

addEncryptedFile(USER_PATH, USER_PASSWORD, ALGORITHM);
