const { writeFile, readFile } = require('fs').promises;
const { isText } = require('istextorbinary');

const { decryptMessage } = require('./cipher');

const [, , USER_PATH, USER_PASSWORD] = process.argv;

async function overwriteAndDecryptFile(path, password) {
  const fileContent = await readFile(path, 'utf8');
  const fileContentIsText = isText(path);
  try {
    const decryptedMessage = await decryptMessage(
      fileContent,
      password,
      fileContentIsText,
    );
    await writeFile(
      path,
      decryptedMessage,
      fileContentIsText ? 'utf8' : 'binary',
    );
  } catch (error) {
    console.error(error.message);
  }
}

overwriteAndDecryptFile(USER_PATH, USER_PASSWORD);
