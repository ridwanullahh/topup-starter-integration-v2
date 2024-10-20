
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Button from "../../components/ui/button";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";


export default function Transactions() {
  const { data: session, status } = useSession();
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    // Fetch transactions based on filter
    fetch(`/api/transactions?filter=${filter}`)
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error(err));
   }, [filter, status, router]);

  const handlePrint = (transaction) => {
    const receiptContent = `
      <html>
        <head>
          <title>Transaction Receipt</title>
        </head>
        <body>
          <h1>Transaction Receipt</h1>
          <p>Transaction ID: ${transaction.id}</p>
          <p>Type: ${transaction.type}</p>
          <p>Amount: ${transaction.amount}</p>
          <p>Status: ${transaction.status}</p>
          <p>Date: ${new Date(transaction.created_at).toLocaleString()}</p>
        </body>
      </html>
    `;
    const receiptWindow = window.open("", "_blank");
    receiptWindow.document.write(receiptContent);
    receiptWindow.document.close();
    receiptWindow.print();
  };

  const handleDownload = (transaction) => {
    // Download transaction logic here
    toast({
      title: "Download",
      description: `Downloading transaction ${transaction.id}.`,
      variant: "success"
    });
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin");
    return null;
  }

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <NavBar />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-extrabold text-center text-blue-600">Transaction History</h2>
        <div className="space-y-4 mt-4">
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700">Filter</label>
          <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="w-full p-2 border rounded-md">
            <option value="all">All</option>
            <option value="wallet">Wallet Funding</option>
            <option value="data">Data Purchase</option>
            <option value="airtime">Airtime Purchase</option>
          </select>
        </div>
        <div className="space-y-4 mt-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-4 border rounded-lg bg-white shadow-md">
              <p>Transaction ID: {transaction.id}</p>
              <p>Type: {transaction.type}</p>
              <p>Amount: {transaction.amount}</p>
              <p>Status: {transaction.status}</p>
              <div className="flex space-x-4 mt-4">
                <Button onClick={() => handlePrint(transaction)} className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Print</Button>
                <Button onClick={() => handleDownload(transaction)} className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600">Download</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
