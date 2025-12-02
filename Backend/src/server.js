import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import { rateLimiter } from "./middleware/rateLimiter.js";
import transactionRouter from "./routes/transactionRouter.js";
import job from "./config/corn.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(rateLimiter);
if (process.env.NODE_ENV === "production") job.start();

const PORT = process.env.PORT || 5003;

app.use("/api/v1/transactions", transactionRouter);

app.get("/health", (req, res) => {
  res.json({ message: "Server is running" });
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
  });
});
