import cryptoJs from "crypto-js";

const encryptPassword = (password) => {
  return cryptoJs.AES.encrypt(password, "this-is-my-secret-key").toString();
};

export default encryptPassword;
