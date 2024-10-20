
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";


export default function AirtimePurchase() {
  const [network, setNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [portedNumber, setPortedNumber] = useState(false);
   const router = useRouter();
   const { data: session } = useSession();

  const handlePurchase = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/airtime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ network, amount, phoneNumber, portedNumber, userId: session.user.id })
    });

    const data = await res.json();

    if (res.ok) {
      toast({
        title: "OTP Sent",
        description: "An OTP has been sent to your email.",
        variant: "success"
      });
      router.push(`/verify-otp?transactionId=${data.transactionId}`);
    } else {
      toast({
        title: "Error",
        description: data.error,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <NavBar />
      <div className="flex flex-1">
        <aside className="w-64 bg-gray-800 text-white h-screen p-4">
          <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
          <nav>
            <ul>
<li className="mb-2"><Link href="/dashboard" className="hover:underline">Dashboard</Link></li>
<li className="mb-2"><Link href="/dashboard/airtime" className="hover:underline">Airtime</Link></li>
<li className="mb-2"><Link href="/dashboard/data" className="hover:underline">Data</Link></li>
<li className="mb-2"><Link href="/dashboard/transactions" className="hover:underline">Transactions</Link></li>
<li className="mb-2"><Link href="/dashboard/credit" className="hover:underline">Credit Wallet</Link></li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-4">
          <form onSubmit={handlePurchase} className="space-y-6">
            <h2 className="text-3xl font-extrabold text-center text-blue-600">Purchase Airtime</h2>
            <div className="space-y-2">
              <label htmlFor="network" className="block text-sm font-medium text-gray-700">Network</label>
              <Select onValueChange={(value) => setNetwork(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MTN">MTN</SelectItem>
                  <SelectItem value="Glo">Glo</SelectItem>
                  <SelectItem value="Airtel">Airtel</SelectItem>
                  <SelectItem value="9Mobile">9Mobile</SelectItem>
                </SelectContent>
              </Select>
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
              <label htmlFor="portedNumber" className="block text-sm font-medium text-gray-700">Ported Number</label>
              <input
                id="portedNumber"
                type="checkbox"
                checked={portedNumber}
                onChange={(e) => setPortedNumber(e.target.checked)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
              <Input
                id="amount"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Purchase</Button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
}
