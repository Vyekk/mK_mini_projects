const { writeFile, readFile } = require('fs').promises;
const { isText } = require('istextorbinary');
const { encryptMessage } = require('./cipher');

const [, , USER_PATH, USER_PASSWORD] = process.argv;

async function overwriteAndEncryptFile(path, password) {
  const fileContentIsText = isText(path);
  const fileContent = await readFile(
    path,
    fileContentIsText ? 'utf8' : 'binary',
  );
  const encryptedMessage = await encryptMessage(
    fileContent,
    password,
    fileContentIsText,
  );
  await writeFile(path, JSON.stringify(encryptedMessage));
}

overwriteAndEncryptFile(USER_PATH, USER_PASSWORD);
