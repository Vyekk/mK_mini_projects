const { writeFile, readFile } = require('fs').promises;
const { createEncryptedMessage } = require('./cipher');

const [, , USER_PATH, USER_PASSWORD] = process.argv;

async function overwriteAndEncryptFile(path, password) {
  const fileContent = await readFile(path, {
    encoding: 'utf-8',
  });
  const encryptedMessage = await createEncryptedMessage(fileContent, password);
  await writeFile(path, JSON.stringify(encryptedMessage));
}

overwriteAndEncryptFile(USER_PATH, USER_PASSWORD);
