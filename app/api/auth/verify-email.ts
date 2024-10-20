
import { NextApiRequest, NextApiResponse } from "next";
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
  if (req.method === "POST") {
    const { token } = req.query;

    // Verify token
    const userResult = await client.query("SELECT * FROM users WHERE verification_token = $1", [token]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ success: false, error: "Invalid or expired token" });
    }

    const user = userResult.rows[0];

    // Update user to verified
    await client.query("UPDATE users SET verification_token = NULL WHERE verification_token = $1", [token]);

    await sendEmail(user.email, "Email Verified", "Your email has been verified successfully.", "<p>Your email has been verified successfully.</p>");
    return res.status(200).json({ success: true, message: "Email verified successfully" });
  } else {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
