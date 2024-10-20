
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
    const result = await client.query("SELECT * FROM services");
    res.status(200).json(result.rows);
  } else if (req.method === "POST") {
    const { id, enabled } = req.body;
    await client.query("UPDATE services SET enabled = $1 WHERE id = $2", [enabled, id]);
    res.status(200).json({ message: "Service updated successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
