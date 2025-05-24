import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../models/userModel";
import { signJwt } from "../utils/jwt";

//register
export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "ALL FIELDS ARE REQUIRED." });
    return;
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ message: "Email already exist" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await createUser(name, email, hashedPassword);

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (err) {
    console.error("Register Error: ", err);
    res.status(500).json({ message: "Server error" });
  }
};

//login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and Password required" });
  }

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      res.status(401).json({ message: "invalid email or password" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ meassage: "invalid passwrd or email" });
      return;
    }

    //jwt
    const token = signJwt({ id: user.id, role: user.role });

    res.status(200).json({
      message: "login successful",
      token,
      user: { is: user.id, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error("login error: ", err);
    res.status(500).json({ message: "server error" });
  }
};
