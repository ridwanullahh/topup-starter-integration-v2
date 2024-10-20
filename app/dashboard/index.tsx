
import Link from "next/link";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import { Button } from "../../components/ui/button";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/user/wallet-balance")
        .then((res) => res.json())
        .then((data) => setWalletBalance(data.balance))
        .catch((err) => console.error(err));
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin");
    return null;
  }

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
          <div className="container mx-auto p-4">
            <h2 className="text-3xl font-extrabold text-center text-blue-600">Welcome, {session.user.name}</h2>
            <p className="text-center text-gray-700">Your email: {session.user.email}</p>
            <p className="text-center text-gray-700">Wallet Balance: ₦{walletBalance}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Button onClick={() => router.push("/purchase")} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Purchase Airtime/Data</Button>
              <Button onClick={() => router.push("/transactions")} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">View Transactions</Button>
            </div>
            <Button onClick={() => toast({ title: "Success", description: "You are logged in!", variant: "success" })} className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 mt-4">
              Show Toast
            </Button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
