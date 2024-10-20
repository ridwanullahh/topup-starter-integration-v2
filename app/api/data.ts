
import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";
import dotenv from "dotenv";
import { sendEmail } from "../../utils/email";
import { randomBytes } from "crypto";

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL_POSTGRES,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const generateOTP = () => {
  return randomBytes(3).toString("hex").toUpperCase();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
const { network, product: productId, phoneNumber, portedNumber, userId, otp: userOtp } = req.body;

    // Fetch product details
    const productResult = await client.query("SELECT amount FROM products WHERE id = $1", [productId]);
    if (productResult.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    const amount = productResult.rows[0].amount;

    // Check user wallet balance
    const userResult = await client.query("SELECT wallet_balance, email FROM users WHERE id = $1", [userId]);
    const walletBalance = userResult.rows[0].wallet_balance;
    const userEmail = userResult.rows[0].email;

    if (walletBalance < amount) {
      return res.status(400).json({ error: "Insufficient wallet balance" });
    }

    // Generate OTP and send to user email
    const otp = generateOTP();
    await sendEmail(userEmail, "Your OTP Code", `Your OTP code is ${otp}`, `<p>Your OTP code is <strong>${otp}</strong></p>`);

    // Save transaction with pending status
    const transactionResult = await client.query(
      "INSERT INTO transactions (user_id, type, amount, status, api_endpoint, phone_number, network, ported_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
      [userId, "data", amount, "pending", "BilalSada", phoneNumber, network, portedNumber]
    );
    const transactionId = transactionResult.rows[0].id;

    // Verify OTP
    if (userOtp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Interact with BilalSada or Alrahuz API
    let apiResponse;
    if (transactionResult.rows[0].api_endpoint === "BilalSada") {
      apiResponse = await fetch("https://bilalsadasub.com/api/data", {
        method: "POST",
        headers: {
          "Authorization": `Token ${process.env.BILALSADA_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          network,
          phone: phoneNumber,
          data_plan: productId,
          bypass: portedNumber,
          request_id: `Data_${transactionId}`
        })
      });
    } else {
      apiResponse = await fetch("https://alrahuzdata.com.ng/api/data", {
        method: "POST",
        headers: {
          "Authorization": `Token ${process.env.ALRAHUZ_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          network,
          mobile_number: phoneNumber,
          plan: productId,
          Ported_number: portedNumber,
          request_id: `Data_${transactionId}`
        })
      });
    }

    const apiData = await apiResponse.json();

    // Update transaction status
    if (apiData.status === "success") {
      await client.query("UPDATE transactions SET status = $1 WHERE id = $2", ["success", transactionId]);
      await client.query("UPDATE users SET wallet_balance = wallet_balance - $1 WHERE id = $2", [amount, userId]);
    }

    res.status(200).json({ message: "Transaction processed successfully" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
