import express from "express";
import cors from "cors";
import indexRouter from "./routes/index.router.js";
import { API_BASE_URL, DOMAIN_NAME } from "./config/env.config.js";
// import genOriginalFromShort from "./middlewares/genoriginalFromShort.middleware.js";
// import validateShortCode from "./middlewares/validateShortCode.middleware.js";

const app = express();

const corsOptions = {
  origin: DOMAIN_NAME,
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"],
  maxAge: 3600,
};

// setup middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`${API_BASE_URL}`, indexRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the URL Shortener API",
    endpoints: {
      createNewUrl: "/api/v1/url/create-url",
      getOriginalUrl: "/api/v1/url/:shortCode",
    },
  });
});

// app.get("/:shortCode", validateShortCode, genOriginalFromShort, (req, res) => {
//   res.status(302).redirect(req.longUrl);
// }); // get original url

export default app;
