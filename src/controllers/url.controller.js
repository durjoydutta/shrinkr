import UrlModel from "../models/url.model.js";
import { DOMAIN_NAME } from "../config/env.config.js";

export const createShortUrl = async (req, res) => {
  const { longUrl } = req.body; 
  const { shortCode } = req.body; 

  try {
    const newUrl = new UrlModel({
      longUrl,
      shortUrl: shortCode && shortCode.length > 0 ? shortCode : undefined,
    });
    await newUrl.save();

    if (newUrl) {
      return res.status(201).json({
        success: true,
        shortUrl: `${DOMAIN_NAME}/${newUrl.shortUrl}`,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// middlewares handle the shortcode validation and generationg of original url
// this just returns the original url to the client
export const getOriginalUrl = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      longUrl: req.longUrl,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred during retrieving the original URL",
      error: err.message,
    });
  }
};
