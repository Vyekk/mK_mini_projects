const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream').promises;
const { createCipher } = require('crypto');
const { promisify } = require('util');
const scrypt = promisify(require('crypto').scrypt);
const { createGzip } = require('zlib');
const { ALGORITHM, ENCRYPT_SALT } = require('./constants');

const [, , USER_INPUT_PATH, USER_OUTPUT_PATH, PASSWORD] = process.argv;

(async () => {
  const key = await scrypt(PASSWORD, ENCRYPT_SALT, 24);
  await pipeline(
    createReadStream(USER_INPUT_PATH),
    createCipher(ALGORITHM, key),
    createGzip(),
    createWriteStream(USER_OUTPUT_PATH),
  );
})();
