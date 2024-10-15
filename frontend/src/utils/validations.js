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

const validateAge = (dob) => {
  const errors = [];
  if (dob) {
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    const dateDiff = today.getDate() - dobDate.getDate();
    const errormsg = "You must be at least 16 years old.";

    // WE CAN COMBINE ALL CONDITIONS USED BELOW IN SINGLE IF CONDITION BUT THE CODE WILL BE TOO MESSY AND UNREADABLE.

    if (age < 16) {
      errors.push(errormsg);
    } else if (age == 16) {
      if (monthDiff < 0) {
        errors.push(errormsg);
      } else if (monthDiff == 0) {
        if (dateDiff < 0) {
          errors.push(errormsg);
        }
      }
    }
    return errors;
  }
  errors.push("Please select a date of birth.");
  return errors;
};

export { validateEmail, validatePassword, validateUsername, validateAge };
