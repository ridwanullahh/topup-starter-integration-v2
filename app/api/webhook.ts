
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
    const { transactionId, status, message } = req.body;

    // Update transaction status
    await client.query("UPDATE transactions SET status = $1, message = $2 WHERE id = $3", [status, message, transactionId]);

    return res.status(200).json({ success: true, message: "Transaction status updated successfully" });
  } else {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
