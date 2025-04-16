import { Router } from "express";

import { createShortUrl, getOriginalUrl} from "../controllers/url.controller.js";
import validateUrl from "../middlewares/validateUrl.middleware.js";

const urlRouter = Router();

urlRouter.route('/create-url').post(validateUrl, createShortUrl); //create shrort url
urlRouter.route('/:shortCode').get(getOriginalUrl); // get original url

export default urlRouter;