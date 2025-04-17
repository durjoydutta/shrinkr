const validateShortCode = (req, res, next) => {
  const shortCode = req.params?.shortCode || req.body?.shortCode;
  
  const { method } = req;
  if (method === 'POST' && (!shortCode || shortCode === '' || shortCode === 'undefined')) {
    return next(); // skip validation for POST requests without shortCode (then it will be generated automatically)
  } 

  let sanitizedShortCode;
  if (shortCode) sanitizedShortCode = shortCode.trim().toLowerCase();
  const regex = /^[\w]{3,6}$/;

  if (!sanitizedShortCode || !regex.test(sanitizedShortCode)) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid alias format. It should contain 3 to 6 alphanumeric characters only.",
    });
  }

  if (req.body) req.body.shortCode = sanitizedShortCode;
  next();
};

export default validateShortCode;
