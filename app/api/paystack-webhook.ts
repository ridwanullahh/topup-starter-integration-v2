
import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";
import dotenv from "dotenv";
import crypto from "crypto";

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
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const hash = crypto.createHmac("sha512", secret).update(JSON.stringify(req.body)).digest("hex");

    if (hash === req.headers["x-paystack-signature"]) {
      const event = req.body;

      if (event.event === "charge.success") {
        const { userId, amount } = event.data.metadata;

        // Update user wallet balance
        await client.query("UPDATE users SET wallet_balance = wallet_balance + $1 WHERE id = $2", [amount, userId]);

        return res.status(200).json({ success: true, message: "Wallet credited successfully" });
      }
    }

    return res.status(400).json({ success: false, error: "Invalid signature" });
  } else {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
