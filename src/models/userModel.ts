import pool from "../config/db";

// Create a user
export const createUser = async (
  name: string,
  email: string,
  hashedPassword: string,
  role: string = "customer"
) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, hashedPassword, role]
  );
  return result.rows[0];
};

// Find user by email
export const findUserByEmail = async (email: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};
