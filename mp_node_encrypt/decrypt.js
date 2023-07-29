const { writeFile, readFile } = require('fs').promises;
const { decryptMessage } = require('./cipher');

const [, , USER_PATH, USER_PASSWORD] = process.argv;

async function overwriteAndDecryptFile(path, password) {
  const fileContent = await readFile(path, {
    encoding: 'utf-8',
  });
  try {
    const decryptedMessage = await decryptMessage(fileContent, password);
    await writeFile(path, decryptedMessage);
  } catch (error) {
    console.error(error.message);
  }
}

overwriteAndDecryptFile(USER_PATH, USER_PASSWORD);
