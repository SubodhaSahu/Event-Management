const showError = (error) => {
  const errors = {};
  if (error.name === 'ValidationError') {
    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });
    console.log(errors);
  }

  return errors;
};

module.exports = showError;
