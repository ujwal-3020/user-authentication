const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const errors = [];

  if (!email) {
    errors.push("Email is required");
  } else if (!emailRegex.test(email)) {
    errors.push("Email must be a valid email address.");
  }

  return errors;
};

const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const errors = [];

  if (!password) {
    errors.push("Password is required");
  } else if (!passwordRegex.test(password)) {
    errors.push(
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character and length should be minimum 8."
    );
  }
  return errors;
};

const validateUsername = (username) => {
  const usernameRegex = /^(?=(?:.*[a-zA-Z]){3,})[a-zA-Z0-9._]{6,}$/;

  const errors = [];

  if (!username) {
    errors.push("Username is required");
  } else if (!usernameRegex.test(username)) {
    errors.push(
      "Username must be of minimum 6 characters including minimum 3 alphabets and should not contain special characters except underscore(_) and dot(.)"
    );
  }

  return errors;
};

export { validateEmail, validatePassword, validateUsername };
