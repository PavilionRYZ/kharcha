import { neon } from "@neondatabase/serverless";
import "dotenv/config";

export const sql = neon(process.env.DB_URL);
// console.log("link:", sql);

export const initDB = async () => {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions (
                 id SERIAL PRIMARY KEY,
                 user_id VARCHAR(255) NOT NULL,
                 title VARCHAR(255) NOT NULL,
                 amount DECIMAL(10,2) NOT NULL,
                 category VARCHAR(255) NOT NULL,
                 created_at DATE NOT NULL DEFAULT CURRENT_DATE
                )`;

    console.log("Database Initialized");
  } catch (error) {
    console.log(error, "Error In Database");
    process.exit(1);
  }
};
