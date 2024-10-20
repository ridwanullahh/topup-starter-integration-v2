
import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL_POSTGRES,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { userId, amount } = req.body;

    // Update user wallet balance
    await client.query("UPDATE users SET wallet_balance = wallet_balance + $1 WHERE id = $2", [amount, userId]);

    return res.status(200).json({ success: true, message: "Wallet credited successfully" });
  } else {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
