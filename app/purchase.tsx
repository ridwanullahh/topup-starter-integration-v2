
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";


export default function Purchase() {
  const { data: session, status } = useSession();
  const [network, setNetwork] = useState("");
  const [product, setProduct] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [portedNumber, setPortedNumber] = useState(false);

  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    // Fetch products based on selected network
    if (network) {
      fetch(`/api/products?network=${network}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error(err));
    }
   }, [network, status, router]);

  const handlePurchase = async (e) => {
    e.preventDefault();
    // Validate wallet balance
    const balanceRes = await fetch("/api/user/wallet-balance");
    const balanceData = await balanceRes.json();
    if (balanceData.balance < amount) {
      toast({
        title: "Insufficient Balance",
        description: "Your wallet balance is insufficient. Please fund your wallet.",
        variant: "destructive"
      });
      return;
    }

    // Confirm purchase
    const confirm = window.confirm(`You're about to purchase ${product} for ${phoneNumber} at ₦${amount}. Would you like to continue?`);
    if (!confirm) return;

    // Generate OTP and send to user email
    const otpRes = await fetch("/api/auth/generate-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: session.user.email })
    });
    if (!otpRes.ok) {
      toast({
        title: "Error",
        description: "Failed to generate OTP. Please try again.",
        variant: "destructive"
      });
      return;
    }

    // Show OTP verification form
    const otp = prompt("Enter the OTP sent to your email:");
    if (!otp) return;

    // Verify OTP and complete purchase
    const purchaseRes = await fetch("/api/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ network, product, phoneNumber, portedNumber, amount, otp })
    });
    const purchaseData = await purchaseRes.json();
    if (purchaseData.success) {
      await sendEmail(session.user.email, "Purchase Successful", `You have successfully purchased ${product} for ${phoneNumber}.`, `<p>You have successfully purchased ${product} for ${phoneNumber}.</p>`);
      toast({
        title: "Purchase Successful",
        description: `You have successfully purchased ${product} for ${phoneNumber}.`,
        variant: "success"
      });
      router.push("/dashboard");
    } else {
      toast({
        title: "Error",
        description: purchaseData.message,
        variant: "destructive"
      });
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-blue-600">Purchase</h1>
        <form onSubmit={handlePurchase} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Network</label>
            <Select onValueChange={setNetwork} value={network}>
              <SelectTrigger>
                <SelectValue placeholder="Select Network" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MTN">MTN</SelectItem>
                <SelectItem value="Glo">Glo</SelectItem>
                <SelectItem value="Airtel">Airtel</SelectItem>
                <SelectItem value="9Mobile">9Mobile</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Product</label>
            <Select onValueChange={setProduct} value={product}>
              <SelectTrigger>
                <SelectValue placeholder="Select Product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((prod) => (
                  <SelectItem key={prod.id} value={prod.id}>{prod.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <Input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ported Number</label>
            <input type="checkbox" checked={portedNumber} onChange={(e) => setPortedNumber(e.target.checked)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <Input type="text" value={amount} readOnly />
          </div>
          <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Purchase</Button>
        </form>
      </div>
    </div>
  );
}
