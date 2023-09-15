import express, { Request, Response, Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "./src/config/config";
import userRoutes from "./src/routes/user";

const app: Application = express();

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => console.log("connected"))
  .catch((e) => console.log(e));

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors for api address/port
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

/** Routes */
app.use("/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is up at http://localhost:${port}`);
});
