import UrlModel from "../models/url.model.js";

// POST: for checking if user provided short is a duplicate key or not
const isExistingShort = async (req, res, next) => {
  const shortCode = req.body && req.body.shortCode;
  // console.log(shortCode);
  if (!shortCode || shortCode === "undefined" || shortCode === "") {
    return next();
  }
  try {
    const isExisting = await UrlModel.findOne({ shortCode: shortCode });
    if (isExisting) {
      return res.status(403).json({
        message: "The given alias already exists",
        success: false,
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred during URL validation",
      error: err.message,
    });
  }
};

export default isExistingShort;
