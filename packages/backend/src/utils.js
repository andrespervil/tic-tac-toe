const validateWithSchema = (schema, data) => {
  try {
    return {
      valid: true,
      data: schema.validateSync(data, {
        abortEarly: false,
        stripUnknown: true
      })
    };
  } catch (err) {
    return { valid: false, data: err.inner };
  }
};

export { validateWithSchema };
