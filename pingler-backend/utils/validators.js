/**
 *
 * @param {String} username
 * @param {String} email
 * @param {String} password
 * @param {String} confirmPassword
 * @returns Object = errors, valid
 */

const validateRegisterInput = (username, email, password, confirmPassword) => {
  const errors = {}; // init error obj
  if (username.trim() === "") errors.username = "Username must not empty";
  if (email.trim() === "") errors.email = "Email must not empty";
  else {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regex))
      errors.email = "Email must be a valid email address";
  }
  if (password.trim() === "") errors.password = "Password must not empty";
  else if (password !== confirmPassword)
    errors.password = "Password must match the confirmed password field";

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") errors.username = "Username must not empty";
  if (password.trim() === "") errors.password = "Password must not empty";

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export { validateRegisterInput, validateLoginInput };
