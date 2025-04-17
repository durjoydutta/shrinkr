import UrlModel from "../models/url.model.js";

//middleware to validate long URL format and check for existing URLs
const isValidLongUrl = async (req, res, next) => {
  let { longUrl } = req.body;
  if (longUrl) longUrl = longUrl.trim().toLowerCase();
  //check url format using regex
  const urlRegex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,4}(\/\S*)?$/;
  if (!longUrl || longUrl === 'undefined' || !urlRegex.test(longUrl)) {
    return res.status(400).json({ error: "Invalid URL format" });
  }
  try {
    const isExistingUrl = await UrlModel.findOne({ longUrl: longUrl });
    if (isExistingUrl) {
      isExistingUrl.shrinkCount += 1;
      await isExistingUrl.save();
      return res.status(200).json({
        shrinkCount: isExistingUrl.shrinkCount,
        clicksCount: isExistingUrl.clicksCount,
        shortCode: `${isExistingUrl.shortCode}`,
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

export default isValidLongUrl;
