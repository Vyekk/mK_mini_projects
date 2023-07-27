const { writeFile, readFile } = require('fs').promises;
const { promisify } = require('util');
const scrypt = promisify(require('crypto').scrypt);
const randomBytes = promisify(require('crypto').randomBytes);
const { createCipheriv } = require('crypto');

const ALGORITHM = 'aes-192-cbc';
const [, , USER_PATH, USER_PASSWORD] = process.argv;

async function createEncryptedMessage(fileContent, password, algorithm) {
  const key = await scrypt(
    password,
    'NASJKHJD*g827y581hjbIUGAS*&FDGY*ASUG*&FGVFBASJIn92hjnknmk#%!@#$(I*Y&! TYjkandkjasnd278Y&*YH@h@#%!&%%(!@&^&*!@%*G!@U(HBIBbasidbasdh9124yhb&@YUG@B%BVy812g',
    24,
  );
  const iv = await randomBytes(16);
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(fileContent, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return {
    encrypted,
    iv: iv.toString('hex'),
  };
}

async function overwriteEncryptedFile(path, password, algorithm) {
  const fileContent = await readFile(path, {
    encoding: 'utf-8',
  });
  const encryptedMessage = await createEncryptedMessage(fileContent, password, algorithm);
  await writeFile(path, JSON.stringify(encryptedMessage));
}

overwriteEncryptedFile(USER_PATH, USER_PASSWORD, ALGORITHM);
