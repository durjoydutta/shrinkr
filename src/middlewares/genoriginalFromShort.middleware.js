import UrlModel from "../models/url.model.js";


const genOriginalFromShort = async (req, res, next) => {
  const shortCode = req.params?.shortCode;
  try {
    const existingUrl = await UrlModel.findOne({ shortUrl: shortCode });

    if (!existingUrl) {
      res.status(401).json({
        success: false,
        message: "Sorry, this url is invalid",
      });
      return;
    }

    existingUrl.clicksCount += 1;
    await existingUrl.save();

    req.longUrl = existingUrl.longUrl;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred during retrieving the original URL",
      error: err.message,
    });
  }
};

export default genOriginalFromShort;
