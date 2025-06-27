const argon2 = require("argon2");

const crypto = require("node:crypto");

async function HashText(Text) {
  const salt = crypto.randomBytes(70);
  try {
    const hashedText = await argon2.hash(Text, {
      type: argon2.argon2id,
      timeCost: 4,
      memoryCost: 2 ** 16,
      parallelism: 2,
      hashLength: 64,
    });

    return hashedText;
  } catch (err) {
    console.log(`There was an error hashing the text | ${err}`);
  }
}

async function Verify(Text, HashedText) {
  try {
    const Verified = await argon2.verify(HashedText, Text);

    return Verified;
  } catch (err) {
    console.log(`There was an error verifying the text | ${err}`);
    return false;
  }
}

module.exports = { HashText, Verify };
