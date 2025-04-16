import express from "express";
import cors from "cors";
import indexRouter from "./routes/index.router.js";
import { API_BASE_URL } from './config/env.config.js';
import { getOriginalUrl } from "./controllers/url.controller.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", //to be changed to the frontend URL
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// setup middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`${API_BASE_URL}`, indexRouter);

app.get('/:shortCode', getOriginalUrl); 

export default app;
