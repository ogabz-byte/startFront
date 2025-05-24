import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  // host: process.env.DB_HOST || "localhost",
  // user: process.env.DB_USER || "root",
  // password: process.env.DB_PASSWORD || "",
  // database: process.env.DB_NAME || "storfrontdb",
  // port: Number(process.env.DB_PORT),

  connectionString: process.env.DATABASE_URL,
});

export default pool;
