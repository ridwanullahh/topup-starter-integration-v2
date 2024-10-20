
import { useState, useEffect } from "react";
import { useToast } from "../../components/ui/use-toast";
import Link from 'next/link';
import { Button } from "../../components/ui/button";


export default function AdminTransactions() {
  const { addToast } = useToast();
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");


  useEffect(() => {
    // Fetch transactions based on filter and search
    fetch(`/api/admin/transactions?filter=${filter}&search=${search}`)
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error(err));
  }, [filter, search]);

  const handleDelete = async (transactionId) => {
    const res = await fetch("/api/admin/transactions", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: transactionId })
    });

    if (res.ok) {
      addToast({
        id: "success-toast",
        message: `Transaction ${transactionId} has been deleted.`,
      });
    } else {
      addToast({
        id: "error-toast",
        message: "Failed to delete transaction. Please try again.",
      });
    }
  };

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <nav>
          <ul>
<li className="mb-2"><Link href="/admin/dashboard" className="hover:underline">Dashboard</Link></li>
<li className="mb-2"><Link href="/admin/users" className="hover:underline">Users</Link></li>
<li className="mb-2"><Link href="/admin/transactions" className="hover:underline">Transactions</Link></li>
<li className="mb-2"><Link href="/admin/api-settings" className="hover:underline">API Settings</Link></li>
<li className="mb-2"><Link href="/admin/products" className="hover:underline">Products</Link></li>
<li className="mb-2"><Link href="/admin/services" className="hover:underline">Services</Link></li>
<li className="mb-2"><Link href="/admin/wallet-action" className="hover:underline">Wallet Action</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4">
        <h2 className="text-2xl font-bold">Admin Transaction History</h2>
        <div className="space-y-4">
          <label htmlFor="filter" className="block">Filter</label>
          <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="block w-full p-2 border rounded">
            <option value="all">All</option>
            <option value="wallet">Wallet Funding</option>
            <option value="data">Data Purchase</option>
            <option value="airtime">Airtime Purchase</option>
          </select>
        </div>
        <div className="space-y-4 mt-4">
          <label htmlFor="search" className="block">Search</label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full p-2 border rounded"
          />
        </div>
        <div className="space-y-4 mt-8">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-4 border rounded-lg bg-white shadow">
              <p>Transaction ID: {transaction.id}</p>
              <p>Type: {transaction.type}</p>
              <p>Amount: {transaction.amount}</p>
              <p>Status: {transaction.status}</p>
              <Button onClick={() => handleDelete(transaction.id)}>Delete</Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
