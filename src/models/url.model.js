import mongoose from "mongoose";
import { URL } from "url";

const UrlSchema = new mongoose.Schema(
  {
    longUrl: {
      type: String,
      required: [true, "A valid URL is required"],
      unique: true,
      validate: {
        validator: function (value) {
          try {
            new URL(value);
            return true;
          } catch (error) {
            return false;
          }
        },
        message: "Invalid URL format",
      },
    },
    shortUrl: {
      type: String,
      required: [true, "Error creating short URL"],
      unique: true,
    },
    shrinkCount: {
      // how many times the URL has been shortened
      type: Number,
      default: 1,
      min: 1,
    },
    expandCount: {
      // how many times the URL has been expanded
      type: Number,
      default: 0,
      min: 0,
    },
    reqCount: {
      // how many times the URL has been requested
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

//pre-save hook to generate a nano-id for the shortUrl field
// UrlSchema.pre("save", function (next) {
//   if (this.isNew) {
//     this.shortUrl = nanoid(10);
//   }
//   next();
// });

const UrlModel = mongoose.model("Url", UrlSchema);

export default UrlModel;
