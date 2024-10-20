
import { useState, useEffect } from "react";
import Link from 'next/link';
import { Input } from "../../components/ui/input";

import { useToast } from "../../components/ui/use-toast";

export default function ApiSettings() {
  const { addToast } = useToast();
  const [settings, setSettings] = useState({
    bilalSadaUrl: "",
    alrahuzUrl: "",
    defaultApi: "BilalSada",
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

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/api-settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(settings)
    });

    if (res.ok) {
      addToast({
        id: "success",
        message: "API settings have been saved."
      });
    } else {
      addToast({
        id: "error",
        message: "Failed to save settings. Please try again."
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
        <form onSubmit={handleSaveSettings} className="space-y-4">
          <h2 className="text-2xl font-bold">API Settings</h2>
          <div className="space-y-2">
            <label htmlFor="bilalSadaUrl">BilalSada URL</label>
            <Input
              id="bilalSadaUrl"
              type="text"
              value={settings.bilalSadaUrl}
              onChange={(e) => setSettings({ ...settings, bilalSadaUrl: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="alrahuzUrl">Alrahuz URL</label>
            <Input
              id="alrahuzUrl"
              type="text"
              value={settings.alrahuzUrl}
              onChange={(e) => setSettings({ ...settings, alrahuzUrl: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="defaultApi">Default API</label>
            <select
              id="defaultApi"
              value={settings.defaultApi}
              onChange={(e) => setSettings({ ...settings, defaultApi: e.target.value })}
              className="block w-full p-2 border rounded"
            >
              <option value="BilalSada">BilalSada</option>
              <option value="Alrahuz">Alrahuz</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="accountNumber">Account Number</label>
            <Input
              id="accountNumber"
              type="text"
              value={settings.accountNumber}
              onChange={(e) => setSettings({ ...settings, accountNumber: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="accountName">Account Name</label>
            <Input
              id="accountName"
              type="text"
              value={settings.accountName}
              onChange={(e) => setSettings({ ...settings, accountName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="bankName">Bank Name</label>
            <Input
              id="bankName"
              type="text"
              value={settings.bankName}
              onChange={(e) => setSettings({ ...settings, bankName: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn">Save Settings</button>
        </form>
      </main>
    </div>
  );
}
