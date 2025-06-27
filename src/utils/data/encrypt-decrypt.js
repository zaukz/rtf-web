const CryptoJS = require("crypto-js");

function deriveKey(password, salt) {
  return CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 10000, // more iterations = more security
  });
}
function Encrypt(Data, Encryption_Key) {
  const salt = CryptoJS.lib.WordArray.random(128 / 8);
  const key = deriveKey(Encryption_Key, salt);
  const iv = CryptoJS.lib.WordArray.random(128 / 8);

  const encrypted = CryptoJS.AES.encrypt(Data, key, { iv: iv });

  return JSON.stringify({
    ciphertext: encrypted.toString(),
    iv: iv.toString(),
    salt: salt.toString(),
  });
}

function Decrypt(Encrypted_Code, Encryption_Key) {
  const payload = JSON.parse(Encrypted_Code);
  const salt = CryptoJS.enc.Hex.parse(payload.salt);
  const iv = CryptoJS.enc.Hex.parse(payload.iv);
  const key = deriveKey(Encryption_Key, salt);

  const decrypted = CryptoJS.AES.decrypt(payload.ciphertext, key, { iv: iv });
  console.log(decrypted.toString(CryptoJS.enc.Utf8));
  return decrypted.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  Encrypt,
  Decrypt,
};
