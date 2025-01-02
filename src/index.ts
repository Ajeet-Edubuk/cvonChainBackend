import express, { Request, Response } from "express";
import { config } from "dotenv";
import { MongoConnection } from "./database/mongo.connection";
import cvRouter from "./routers/cv.router";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

config();


app.use(
  cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/cv", cvRouter);

app.get("/", (req: Request, res: Response) => {
  return res.json({
    message: "Health is ok !",
  });
});

app.listen(process.env.PORT, () => {
  MongoConnection();
  console.log("Backend running on PORT:", process.env.PORT);
});
