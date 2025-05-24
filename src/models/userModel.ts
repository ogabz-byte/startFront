import pool from "../config/db";
import { ResultSetHeader } from "mysql2";

//creating user model, in other to input a user inside de table we made
export const createUser = async (
  name: string,
  email: string,
  hashedPassword: string,
  role: string = "customer"
) => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO users (name, email, password, role) VALUES( ?, ? ,?, ?)",
    [name, email, hashedPassword, role]
  );
  return result;
};

// finding a user
export const findUserByEmail = async (email: string) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  const users = rows as any[];
  return users[0];
};
