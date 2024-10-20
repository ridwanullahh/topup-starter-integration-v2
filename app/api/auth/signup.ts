
import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";
import dotenv from "dotenv";
import { randomBytes } from "crypto";
import bcrypt from "bcrypt";

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL_POSTGRES,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const generateVerificationToken = () => {
  return randomBytes(16).toString("hex");
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, username, phone_number, password } = req.body;
    // Generate verification token
    const verificationToken = generateVerificationToken();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user with verification token
    await client.query(
      "INSERT INTO users (email, username, phone_number, password, role, verification_token, verified) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [email, username, phone_number, hashedPassword, "normal", verificationToken, false]
    );

    return res.status(200).json({ message: "Verification email sent" });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
