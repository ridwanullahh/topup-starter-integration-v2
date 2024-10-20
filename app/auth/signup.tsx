
import { useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "../../components/ui/use-toast";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";



export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { addToast } = useToast();

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Sign-up logic here
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, username, phoneNumber, password })
    });

    if (res.ok) {
      await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          to: email,
          subject: "Email Verification",
          text: "Please verify your email by clicking the link.",
          html: "<p>Please verify your email by clicking the link.</p>"
        })
      });
        addToast({
          id: Math.random().toString(36).substr(2, 9),
          message: "Verification Email Sent",
          description: "A verification email has been sent to your email.",
          variant: "success"
      });
      router.push("/auth/signin");
    } else {
        addToast({
          id: Math.random().toString(36).substr(2, 9),
          message: "Error",
          description: "Sign-up failed. Please try again.",
          variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto">
        <form onSubmit={handleSignUp} className="space-y-6">
          <h2 className="text-3xl font-extrabold text-center text-blue-600">Sign Up</h2>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <Input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Sign Up</Button>
        </form>
      </div>
    </div>
  );
}
