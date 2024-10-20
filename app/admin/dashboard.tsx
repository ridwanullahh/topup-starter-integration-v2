
import { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from "../../components/ui/button";


export default function AdminDashboard() {
  const router = useRouter();
  interface User {
    id: string;
    name: string;
    email: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  interface Transaction {
    id: string;
    type: string;
    amount: number;
    status: string;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  interface ApiBalances {
    [key: string]: number;
  }

  const [apiBalances, setApiBalances] = useState<ApiBalances>({});
  const [filter, setFilter] = useState("all");


  useEffect(() => {
    // Fetch users
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));

    // Fetch transactions
    fetch(`/api/admin/transactions?filter=${filter}`)
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error(err));

    // Fetch API balances
    fetch("/api/admin/api-balances")
      .then((res) => res.json())
      .then((data) => setApiBalances(data))
      .catch((err) => console.error(err));
  }, [filter]);

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
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Users</h3>
          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user.id} className="flex justify-between items-center bg-white p-2 rounded shadow">
                <span>{user.name} - {user.email}</span>
                <Button onClick={() => router.push(`/admin/users/${user.id}`)}>Manage</Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 mt-8">
          <h3 className="text-xl font-bold">Transactions</h3>
          <div className="space-y-4">
            <label htmlFor="filter" className="block">Filter</label>
            <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="block w-full p-2 border rounded">
              <option value="all">All</option>
              <option value="wallet">Wallet Funding</option>
              <option value="data">Data Purchase</option>
              <option value="airtime">Airtime Purchase</option>
            </select>
          </div>
          <ul className="space-y-2">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="flex justify-between items-center bg-white p-2 rounded shadow">
                <span>{transaction.type} - {transaction.amount} - {transaction.status}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 mt-8">
          <h3 className="text-xl font-bold">API Balances</h3>
          <ul className="space-y-2">
            {Object.entries(apiBalances).map(([api, balance]) => (
              <li key={api} className="flex justify-between items-center bg-white p-2 rounded shadow">
                <span>{api}: {balance}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
