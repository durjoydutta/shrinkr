import { Router } from "express";
import urlRouter from "./url.router.js";
// import authRouter from "./auth.route.js";

const indexRouter = Router();

indexRouter.use("/url", urlRouter);
// indexRouter.use("/auth", authRouter);
// indexRouter.use("/user", userRouter);


export default indexRouter;
