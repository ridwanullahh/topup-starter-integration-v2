
import { useState, useEffect } from "react";


import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useToast } from "../../components/ui/use-toast";

interface Product {
  id: string;
  network: string;
  planIdBilalsada: string;
  planIdAlrahuz: string;
  amount: string;
  apiEndpoint: string;
  enabled: boolean;
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    network: "",
    planIdBilalsada: "",
    planIdAlrahuz: "",
    amount: "",
    apiEndpoint: "BilalSada",
    enabled: true
  });

  useEffect(() => {
    // Fetch products
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const { addToast } = useToast();

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    });

    if (res.ok) {
      addToast({
        id: "success",
        message: `Product ${newProduct.network} has been added.`,
      });
      const productWithId = { ...newProduct, id: String(Date.now()) };
      setProducts([...products, productWithId]);
      setNewProduct({
        network: "",
        planIdBilalsada: "",
        planIdAlrahuz: "",
        amount: "",
        apiEndpoint: "BilalSada",
        enabled: true
      });
    } else {
      addToast({
        id: "error",
        message: "Failed to add product. Please try again.",
      });
    }
  };

  const handleUpdateProduct = async (productId: string, updatedProduct: Product) => {
const { ...rest } = updatedProduct;
    const res = await fetch("/api/admin/products", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
body: JSON.stringify(rest)
    });

    if (res.ok) {
      addToast({
        id: "success",
        message: `Product ${productId} has been updated.`,
      });
      setProducts(products.map((product) => (product.id === productId ? updatedProduct : product)));
    } else {
      addToast({
        id: "error",
        message: "Failed to update product. Please try again.",
      });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    const res = await fetch("/api/admin/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: productId })
    });

    if (res.ok) {
      addToast({
        id: "success",
        message: `Product ${productId} has been deleted.`,
      });
      setProducts(products.filter((product) => product.id !== productId));
    } else {
      addToast({
        id: "error",
        message: "Failed to delete product. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <form onSubmit={handleAddProduct} className="space-y-4">
        <div>
          <label htmlFor="network" className="block text-sm font-medium text-gray-700">Network</label>
<Input
  type="text"
  id="network"
  name="network"
  value={newProduct.network}
  onChange={(e) => setNewProduct({ ...newProduct, network: e.target.value })}
  required
/>
        </div>
        <div>
          <label htmlFor="planIdBilalsada" className="block text-sm font-medium text-gray-700">Plan ID (Bilalsada)</label>
<Input
  type="text"
  id="planIdBilalsada"
  name="planIdBilalsada"
  value={newProduct.planIdBilalsada}
  onChange={(e) => setNewProduct({ ...newProduct, planIdBilalsada: e.target.value })}
  required
/>
        </div>
        <div>
          <label htmlFor="planIdAlrahuz" className="block text-sm font-medium text-gray-700">Plan ID (Alrahuz)</label>
<Input
  type="text"
  id="planIdAlrahuz"
  name="planIdAlrahuz"
  value={newProduct.planIdAlrahuz}
  onChange={(e) => setNewProduct({ ...newProduct, planIdAlrahuz: e.target.value })}
  required
/>
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
<Input
  type="text"
  id="amount"
  name="amount"
  value={newProduct.amount}
  onChange={(e) => setNewProduct({ ...newProduct, amount: e.target.value })}
  required
/>
        </div>
        <div>
          <label htmlFor="apiEndpoint" className="block text-sm font-medium text-gray-700">API Endpoint</label>
<Input
  type="text"
  id="apiEndpoint"
  name="apiEndpoint"
  value={newProduct.apiEndpoint}
  onChange={(e) => setNewProduct({ ...newProduct, apiEndpoint: e.target.value })}
  required
/>
        </div>
        <div>
          <label htmlFor="enabled" className="block text-sm font-medium text-gray-700">Enabled</label>
<Input
  id="enabled"
  name="enabled"
  type="checkbox"
  value={String(newProduct.enabled)}
  checked={newProduct.enabled}
  onChange={(e) => setNewProduct({ ...newProduct, enabled: e.target.checked })}
          />
        </div>
<button type="submit" className="btn btn-primary">Add Product</button>
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Products</h2>
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product.id} className="p-4 border rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold">{product.network}</p>
                  <p>Plan ID (Bilalsada): {product.planIdBilalsada}</p>
                  <p>Plan ID (Alrahuz): {product.planIdAlrahuz}</p>
                  <p>Amount: {product.amount}</p>
                  <p>API Endpoint: {product.apiEndpoint}</p>
                  <p>Enabled: {product.enabled ? "Yes" : "No"}</p>
                </div>
                <div className="space-x-2">
                  <Button onClick={() => handleUpdateProduct(product.id, product)}>Update</Button>
<Button onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
