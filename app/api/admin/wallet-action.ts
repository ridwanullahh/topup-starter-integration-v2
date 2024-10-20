
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { userId, amount, action } = req.body;
    const userResult = await client.query("SELECT wallet_balance FROM users WHERE id = $1", [userId]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let newBalance;
    if (action === "credit") {
      newBalance = parseFloat(user.wallet_balance) + parseFloat(amount);
    } else if (action === "debit") {
      if (parseFloat(user.wallet_balance) < parseFloat(amount)) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
      newBalance = parseFloat(user.wallet_balance) - parseFloat(amount);
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await client.query("UPDATE users SET wallet_balance = $1 WHERE id = $2", [newBalance, userId]);
    res.status(200).json({ message: `Wallet ${action}ed successfully` });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
