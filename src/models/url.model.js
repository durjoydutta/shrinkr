import mongoose from "mongoose";
import generateCustomId from "../utils/generateNanoId.js";

const UrlSchema = new mongoose.Schema(
  {
    longUrl: {
      type: String,
      required: [true, "A valid URL is required"],
      unique: true,
    },
    shortUrl: {
      type: String,
      required: [true, "Error creating short URL"],
      minLength: 3,
      maxLength: 6,
      default: () => generateCustomId(6),
      validate: {
        validator: function (value) {
          return /^[\w]{3,6}$/.test(value);
        },
        message:
          "Database Error: Short URL must be 3 to 6 alphanumeric characters",
      },
      unique: true,
    },
    shrinkCount: {
      // how many times the long URL has been shortened
      type: Number,
      default: 1,
      min: 1,
    },
    clicksCount: {
      // how many times the short URL has been clicked
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const UrlModel = mongoose.model("Url", UrlSchema);

export default UrlModel;
