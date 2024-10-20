
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Session as NextAuthSession } from "next-auth";

interface SessionWithOTP extends NextAuthSession {
  otp?: string;
}
import { Client } from "pg";
import dotenv from "dotenv";
import { sendEmail } from "../../../utils/email";

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL_POSTGRES,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req }) as SessionWithOTP;

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { otp, transactionId } = req.body;

  if (otp !== session.otp) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  // Send email notification for OTP verification
  await sendEmail(session.user.email, "OTP Verified", "Your OTP has been verified successfully.", "<p>Your OTP has been verified successfully.</p>");

  // Clear session OTP
  delete session.otp;

  // Interact with BilalSada or Alrahuz API
  const transactionResult = await client.query("SELECT * FROM transactions WHERE id = $1", [transactionId]);
  const transaction = transactionResult.rows[0];

  let apiResponse;
  if (transaction.api_endpoint === "BilalSada") {
    apiResponse = await fetch("https://bilalsadasub.com/api/topup", {
      method: "POST",
      headers: {
        "Authorization": `Token ${process.env.BILALSADA_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        network: transaction.network,
        phone: transaction.phone_number,
        plan_type: transaction.type === "airtime" ? "VTU" : "data",
        amount: transaction.amount,
        request_id: `${transaction.type}_${transactionId}`
      })
    });
  } else {
    apiResponse = await fetch("https://alrahuzdata.com.ng/api/topup", {
      method: "POST",
      headers: {
        "Authorization": `Token ${process.env.ALRAHUZ_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        network: transaction.network,
        mobile_number: transaction.phone_number,
        amount: transaction.amount,
        Ported_number: transaction.ported_number,
        airtime_type: transaction.type === "airtime" ? "VTU" : "data"
      })
    });
  }

  const apiData = await apiResponse.json();

  // Update transaction status
  if (apiData.status === "success") {
    await client.query("UPDATE transactions SET status = $1 WHERE id = $2", ["success", transactionId]);
    await client.query("UPDATE users SET wallet_balance = wallet_balance - $1 WHERE id = $2", [transaction.amount, transaction.user_id]);
  }

  res.status(200).json({ message: "OTP verified and transaction processed" });
}
