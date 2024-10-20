
import NavBar from "../../components/NavBar";
import Link from 'next/link';
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

import { sendEmail } from "../../utils/email";

export default function WalletCredit() {
  const [amount, setAmount] = useState("");
  const router = useRouter();

  const [settings, setSettings] = useState({
    accountNumber: "",
    accountName: "",
    bankName: ""
  });

  useEffect(() => {
    // Fetch API settings
    fetch("/api/admin/api-settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error(err));
  }, []);

  const handleCredit = async (e) => {
    e.preventDefault();
    // Manual wallet funding
    const manualFunding = confirm("Would you like to fund your wallet manually?");
    if (manualFunding) {
      alert("Please transfer the amount to the following bank details:");
      alert(`Bank: ${settings.bankName}`);
      alert(`Account Number: ${settings.accountNumber}`);
      alert(`Account Name: ${settings.accountName}`);
      const userBankDetails = prompt("Enter your bank details (Bank Name, Account Number, Account Name):");
      const res = await fetch("/api/wallet/manual-funding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: session.user.id, amount, userBankDetails })
      });
      if (res.ok) {
        toast({
          title: "Manual Funding Request Sent",
          description: "Your manual funding request has been sent to the admin for approval.",
          variant: "success"
        });
        router.push("/dashboard");
      } else {
        toast({
          title: "Error",
          description: "Failed to send manual funding request. Please try again.",
          variant: "destructive"
        });
      }
      return;
    }

    // Paystack wallet funding
    const paystackFunding = confirm("Would you like to fund your wallet via Paystack?");
    if (paystackFunding) {
      const res = await fetch("/api/wallet/paystack-funding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: session.user.id, amount })
      });
      if (res.ok) {
        await sendEmail(session.user.email, "Wallet Credited", `Your wallet has been credited with ${amount}.`, `<p>Your wallet has been credited with ${amount}.</p>`);
        toast({
          title: "Wallet Credited",
          description: `Your wallet has been credited with ${amount}.`,
          variant: "success"
        });
        router.push("/dashboard");
      } else {
        toast({
          title: "Error",
          description: "Failed to credit wallet via Paystack. Please try again.",
          variant: "destructive"
        });
      }
      return;
    }

    if (res.ok) {
      toast({
        title: "Wallet Credited",
        description: `Your wallet has been credited with ${amount}.`,
        variant: "success"
      });
      router.push("/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Failed to credit wallet. Please try again.",
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
          <form onSubmit={handleCredit} className="space-y-6">
            <h2 className="text-3xl font-extrabold text-center text-blue-600">Credit Wallet</h2>
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
            <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Credit Wallet</Button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
}
