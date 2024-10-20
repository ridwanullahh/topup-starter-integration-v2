
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useToast } from "../../components/ui/use-toast";

export default function SignIn() {
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password
    });

    if (res.ok) {
      setStep(2);
      addToast({
        id: Math.random().toString(36).substr(2, 9),
        message: "OTP Sent",
        description: "An OTP has been sent to your email.",
        variant: "success"
      });
    } else {
      addToast({
        id: Math.random().toString(36).substr(2, 9),
        message: "Error",
        description: res.error,
        variant: "destructive"
      });
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ otp })
    });

    if (res.ok) {
      router.push("/dashboard");
      addToast({
        id: Math.random().toString(36).substr(2, 9),
        message: "OTP Verified",
        description: "Your OTP has been verified successfully.",
        variant: "success"
      });
    } else {
      addToast({
        id: Math.random().toString(36).substr(2, 9),
        message: "Error",
        description: "Invalid OTP. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto">
        {step === 1 && (
          <form onSubmit={handleSignIn} className="space-y-6">
            <h2 className="text-3xl font-extrabold text-center text-blue-600">Sign In</h2>
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
            <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Sign In</Button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <h2 className="text-3xl font-extrabold text-center text-blue-600">Verify OTP</h2>
            <div className="space-y-2">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Verify OTP</Button>
          </form>
        )}
      </div>
    </div>
  );
}
