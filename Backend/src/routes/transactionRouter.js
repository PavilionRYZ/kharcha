import express from "express";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  getBalanceSummary,
} from "../controller/transaction.controller.js";

const router = express.Router();

router.get("/:userId", getTransactions);
router.post("/", addTransaction);
router.delete("/:id", deleteTransaction);
router.get("/summary/:userId", getBalanceSummary);

export default router;
