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

export default validateEmail;
