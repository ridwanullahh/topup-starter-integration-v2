
import { useState, useEffect } from "react";
import Link from 'next/link';
import { Button } from "../../components/ui/button";
import { useToast } from "../../components/ui/use-toast";


export default function ServiceManagement() {
interface Service {
  id: string;
  name: string;
  enabled: boolean;
}

const [services, setServices] = useState<Service[]>([]);


  useEffect(() => {
    // Fetch services
    fetch("/api/admin/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error(err));
  }, []);

const { addToast } = useToast();

const handleToggleService = async (serviceId: string) => {
    // Toggle service logic here
    // For demonstration, let's assume the toggle is always successful
    addToast({
      id: serviceId,
      message: `Service ${serviceId} has been toggled.`
    });
    setServices(
      services.map((service) =>
        service.id === serviceId ? { ...service, enabled: !service.enabled } : service
      )
    );
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
        <h2 className="text-2xl font-bold">Service Management</h2>
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="p-4 border rounded-lg bg-white shadow">
              <p>Service: {service.name}</p>
              <p>Enabled: {service.enabled ? "Yes" : "No"}</p>
              <Button onClick={() => handleToggleService(service.id)}>
                {service.enabled ? "Disable" : "Enable"} Service
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
