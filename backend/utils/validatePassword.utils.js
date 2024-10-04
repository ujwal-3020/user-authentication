const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // ?=  = POSITIVE LOOKAHEAD

const validatePassword = (password) => {
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
    );
  }
};

module.exports = validatePassword;
