import express, { Request, Response } from "express";
import { config } from "dotenv";
import { MongoConnection } from "./database/mongo.connection";
import cvRouter from "./routers/cv.router";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

config();

// Explicit CORS Middleware for Vercel
const corsOptions = {
  origin: "https://edubuk-cv-on-chain.vercel.app", // Replace with your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware to handle CORS headers for all routes (fallback)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://edubuk-cv-on-chain.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.status(204).end(); // Handle preflight requests
  }
  next();
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/cv", cvRouter);

app.get("/", (req: Request, res: Response) => {
  return res.json({
    message: "Health is ok!",
  });
});

app.listen(process.env.PORT, () => {
  MongoConnection();
  console.log("Backend running on PORT:", process.env.PORT);
});
