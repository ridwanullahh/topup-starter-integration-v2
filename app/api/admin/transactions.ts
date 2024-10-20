
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
const { filter, search } = req.query;
let query = "SELECT * FROM transactions";
const params = [];


    if (filter && filter !== "all") {
      query += " WHERE type = $1";
      params.push(filter);
    }

    if (search) {
      query += params.length ? " AND" : " WHERE";
      query += " (id::text LIKE $2 OR type LIKE $2 OR amount::text LIKE $2 OR status LIKE $2)";
      params.push(`%${search}%`);
    }

    const result = await client.query(query, params);
    res.status(200).json(result.rows);
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    await client.query("DELETE FROM transactions WHERE id = $1", [id]);
    res.status(200).json({ message: "Transaction deleted successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
