
import NextAuth, { Session } from "next-auth";

interface CustomUser {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface CustomUser extends NextAuthUser {
  id: string;
}

interface CustomSession extends Session {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
}



interface UserWithOTP extends NextAuthUser {
  otp: string;
}


import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { Client } from "pg";
import { sendEmail } from "../../../utils/email";
import nodemailer from "nodemailer";
import { randomBytes } from "crypto";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL_POSTGRES,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const transporter = nodemailer.createTransport({
  host: "mail.hub.net.ng",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASS
  }
});

const generateOTP = () => {
  return randomBytes(3).toString("hex").toUpperCase();
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const res = await client.query(
          "SELECT * FROM users WHERE email = $1 AND password = $2",
          [credentials.email, credentials.password]
        );

        if (res.rows.length > 0) {
          const user = res.rows[0];
          const otp = generateOTP();
          await sendEmail(user.email, "Your OTP Code", `Your OTP code is ${otp}`, `<p>Your OTP code is <strong>${otp}</strong></p>`);
          return { ...user, id: user.id, otp };
        } else {
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const otp = generateOTP();

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Your OTP Code",
          text: 'Your OTP code is ' + otp
        });

        (user as UserWithOTP).otp = otp;
      }

      return true;
    },
    async session({ session, user }) {
      const customSession = session as CustomSession;
      customSession.user = {
        ...customSession.user,
        id: (user as CustomUser).id,
        name: user.name,
        email: user.email,
        image: user.image,
      };
      return customSession;
    }
  },
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request"
  }
});
