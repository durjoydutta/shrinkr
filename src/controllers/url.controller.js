import { nanoid } from "nanoid";
import UrlModel from "../models/url.model.js";
import { DOMAIN_NAME } from "../config/env.config.js";

export const createShortUrl = async (req, res) => {
  // get long url from request body then match it against regex and store it in the database
  const { longUrl } = req.body;

  try {
    const isExistingUrl = await UrlModel.findOne({ longUrl: longUrl });
    if (isExistingUrl) {
      isExistingUrl.shrinkCount += 1;
      await isExistingUrl.save();
      return res.status(200).json({
        shortUrl: isExistingUrl.shortUrl,
      });
    }

    const shortUrl = nanoid(10);

    const newUrl = new UrlModel({
      longUrl,
      shortUrl,
    });
    await newUrl.save();

    if (newUrl) {
      return res.status(201).json({
        shortUrl: `${DOMAIN_NAME}/${shortUrl}`,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getOriginalUrl = async (req, res) => {
  const shortCode = req.params.shortCode;
  try {
    const existingUrl = await UrlModel.findOne({ shortUrl: shortCode });

    if (!existingUrl) {
      res.status(401).json({
        success: false,
        message: "Sorry, this url is invalid",
      });
      return;
    }

    existingUrl.expandCount += 1;
    await existingUrl.save();

    return res.status(200).json({
      success: true,
      longUrl: existingUrl.longUrl,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred during retrieving the original URL",
      error: err.message,
    });
  }
};
