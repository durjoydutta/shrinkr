import { Router } from "express";
import { createShortUrl, getOriginalUrl} from "../controllers/url.controller.js";
import isValidLongUrl from "../middlewares/isValidLongUrl.middleware.js";
import validateShortCode from "../middlewares/validateShortCode.middleware.js";
import genOriginalFromShort from "../middlewares/genoriginalFromShort.middleware.js";

const urlRouter = Router();

urlRouter.route('/create-url').post(validateShortCode, isValidLongUrl, createShortUrl); //create shrort url
urlRouter.route('/:shortCode').get(validateShortCode, genOriginalFromShort, getOriginalUrl); // get original url

export default urlRouter;