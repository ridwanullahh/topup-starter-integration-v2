
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
  if (req.method === 'GET') {
    // Example logic for GET request
    const amount = 500; // Example value, replace with actual logic to get the amount
    const walletBalance = 1000; // Example value, replace with actual logic to get wallet balance
    if (walletBalance < amount) {
      return res.status(400).json({ error: "Insufficient wallet balance" });
    }

    // Interact with BilalSada or Alrahuz API

    return res.status(200).json({ message: "Airtime purchase successful" });
  } else if (req.method === 'POST') {
    // Example logic for POST request
    const { amount } = req.body;
    const walletBalance = 1000; // Example value, replace with actual logic to get wallet balance
    if (walletBalance < amount) {
      return res.status(400).json({ error: "Insufficient wallet balance" });
    }

    // Interact with BilalSada or Alrahuz API

    return res.status(200).json({ message: "Airtime purchase successful" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
