
import { useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "../../components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
   const router = useRouter();
   const { addToast } = useToast();

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
      </div>
    </div>
  );
}
