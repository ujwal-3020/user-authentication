const cryptoJs = require("crypto-js");

const decryptPassword = (encryptedPassword) => {
  return cryptoJs.AES.decrypt(
    encryptedPassword,
    "this-is-my-secret-key"
  ).toString(cryptoJs.enc.Utf8);
};

module.exports = decryptPassword;
