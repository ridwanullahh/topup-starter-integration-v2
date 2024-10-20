
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

const apiSettingsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    console.log("Received GET request for API settings");
    const result = await client.query("SELECT * FROM api_settings");
    console.log("API settings fetched:", result.rows[0]);
    res.status(200).json(result.rows[0]);
  } else if (req.method === "POST") {
    const { bilalSadaUrl, alrahuzUrl, defaultApi, accountNumber, accountName, bankName } = req.body;
    await client.query(
      "UPDATE api_settings SET bilal_sada_url = $1, alrahuz_url = $2, default_api = $3, account_number = $4, account_name = $5, bank_name = $6",
      [bilalSadaUrl, alrahuzUrl, defaultApi, accountNumber, accountName, bankName]
    );
    res.status(200).json({ message: "API settings updated successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default apiSettingsHandler;
