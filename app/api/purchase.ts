
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Session as NextAuthSession } from "next-auth";

interface SessionWithID extends NextAuthSession {
  user: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    otp?: string;
  };
}
import { Client } from "pg";
import dotenv from "dotenv";
import { sendEmail } from "../../utils/email";

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL_POSTGRES,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req }) as SessionWithID;

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { network, product, phoneNumber, portedNumber, amount } = req.body;

  // Validate wallet balance
  const userResult = await client.query("SELECT wallet_balance FROM users WHERE id = $1", [session.user.id]);
  const user = userResult.rows[0];

  if (user.wallet_balance < amount) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  // Create transaction
  const transactionResult = await client.query(
    "INSERT INTO transactions (user_id, network, product, phone_number, ported_number, amount, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
    [session.user.id, network, product, phoneNumber, portedNumber, amount, "pending"]
  );
  const transactionId = transactionResult.rows[0].id;

  // Generate OTP and send to user email
  const otp = Math.random().toString(36).substring(2, 8).toUpperCase();
  (session as SessionWithID & { otp: string }).otp = otp;
  await sendEmail(session.user.email, "OTP for Purchase", `Your OTP is ${otp}`, `<p>Your OTP is ${otp}</p>`);

  return res.status(200).json({ success: true, transactionId });
}
