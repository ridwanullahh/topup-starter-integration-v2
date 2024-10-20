
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
    const result = await client.query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } else if (req.method === "POST") {
    const { username, email, phoneNumber, password, role } = req.body;
    await client.query(
      "INSERT INTO users (username, email, phone_number, password, role) VALUES ($1, $2, $3, $4, $5)",
      [username, email, phoneNumber, password, role]
    );
    res.status(201).json({ message: "User added successfully" });
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    await client.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
