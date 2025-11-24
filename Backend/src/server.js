import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import { rateLimiter } from "./middleware/rateLimiter.js";
import transactionRouter from "./routes/transactionRouter.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(rateLimiter);

const PORT = process.env.PORT || 5003;

app.use("/api/v1/transactions", transactionRouter);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
  });
});
