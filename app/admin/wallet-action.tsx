
import { useState, useEffect } from "react";
import { useToast } from "../../components/ui/use-toast";
import Link from 'next/link';
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";


export default function WalletAction() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [amount, setAmount] = useState("");
  const [action, setAction] = useState("credit");


  useEffect(() => {
    // Fetch users
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const { addToast } = useToast();
  const handleWalletAction = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin/wallet-action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: selectedUser, amount, action })
    });

    if (res.ok) {
      addToast({
        id: "success-toast",
        message: `You have successfully ${action}ed ${amount} to ${selectedUser}.`,
      });
      setAmount("");
      setSelectedUser("");
    } else {
      addToast({
        id: "error-toast",
        message: `Failed to ${action} wallet. Please try again.`,
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
        <form onSubmit={handleWalletAction} className="space-y-4">
          <h2 className="text-2xl font-bold">Wallet Action</h2>
          <div className="space-y-2">
            <label htmlFor="user">User</label>
            <select id="user" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} className="block w-full p-2 border rounded">
              <option value="">Select user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} - {user.email}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="amount">Amount</label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="action">Action</label>
            <select id="action" value={action} onChange={(e) => setAction(e.target.value)} className="block w-full p-2 border rounded">
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>
          <Button type="submit">{action.charAt(0).toUpperCase() + action.slice(1)} Wallet</Button>
        </form>
      </main>
    </div>
  );
}
