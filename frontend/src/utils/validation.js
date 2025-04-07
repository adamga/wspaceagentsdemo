export const validateRegistrationForm = (username, email, password, confirmPassword) => {
  const errors = [];
  if (!username) errors.push('Username is required');
  if (!email) errors.push('Email is required');
  if (!password) errors.push('Password is required');
  if (password !== confirmPassword) errors.push('Passwords do not match');
  return errors;
};

export const validateLoginForm = (username, password) => {
  const errors = [];
  if (!username) errors.push('Username is required');
  if (!password) errors.push('Password is required');
  return errors;
};

export const validatePicksForm = (picks) => {
  const errors = [];
  const uniquePicks = new Set(picks);
  if (uniquePicks.size !== 12) errors.push('You must select 12 unique players');
  return errors;
};
