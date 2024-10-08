const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const errors = [];

  if (!password) {
    errors.push("Password is required.");
  } else if (!passwordRegex.test(password)) {
    errors.push(
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character and length should be minimum 8."
    );
  }
  return errors;
};

export default validatePassword;
