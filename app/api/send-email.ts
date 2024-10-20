
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "mail.hub.net.ng",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASS
  }
});

export default async function handler(req, res) {
  const { to, subject, text, html } = req.body;

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_EMAIL_USER,
    to,
    subject,
    text,
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error.message, error.stack);
    res.status(500).json({ error: "Error sending email" });
  }
}
