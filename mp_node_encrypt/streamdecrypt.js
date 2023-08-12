const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream').promises;
const { createDecipher } = require('crypto');
const { promisify } = require('util');
const scrypt = promisify(require('crypto').scrypt);
const { createGunzip } = require('zlib');
const { ALGORITHM, ENCRYPT_SALT } = require('./constants');

const [, , USER_INPUT_PATH, USER_OUTPUT_PATH, PASSWORD] = process.argv;

(async () => {
  const key = await scrypt(PASSWORD, ENCRYPT_SALT, 24);
  await pipeline(
    createReadStream(USER_INPUT_PATH),
    createGunzip(),
    createDecipher(ALGORITHM, key),
    createWriteStream(USER_OUTPUT_PATH),
  );
})();
