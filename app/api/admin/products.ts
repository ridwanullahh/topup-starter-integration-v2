
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
  if (req.method === "GET") {
    const result = await client.query("SELECT * FROM products");
    res.status(200).json(result.rows);
  } else if (req.method === "POST") {
    const { network, planIdBilalsada, planIdAlrahuz, amount, apiEndpoint, enabled } = req.body;
    await client.query(
      "INSERT INTO products (network, plan_id_bilalsada, plan_id_alrahuz, amount, api_endpoint, enabled) VALUES ($1, $2, $3, $4, $5, $6)",
      [network, planIdBilalsada, planIdAlrahuz, amount, apiEndpoint, enabled]
    );
    res.status(201).json({ message: "Product added successfully" });
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    await client.query("DELETE FROM products WHERE id = $1", [id]);
    res.status(200).json({ message: "Product deleted successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
