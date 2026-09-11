import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Server status: ${res.status}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        const res = await fetch(`${API_URL}/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
        if (!res.ok) throw new Error("Failed to edit product");
        const updated = await res.json();
        setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
        setEditingProduct(null);
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
        if (!res.ok) throw new Error("Failed to add product");
        const newProduct = await res.json();
        setProducts([...products, newProduct]);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Title Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-800">
            Generation Thailand Kids Store
          </h1>
          <h2 className="text-2xl font-extrabold text-slate-800 mt-1">
            ระบบจัดการคลังสินค้า Admin Section
          </h2>
        </header>

        {/* Form Section */}
        <ProductForm
          onSubmit={handleSaveProduct}
          editingProduct={editingProduct}
          onCancelEdit={() => setEditingProduct(null)}
        />

        {/* Status Messages */}
        {loading && (
          <p className="text-center py-4 text-gray-500">Loading...</p>
        )}
        {error && (
          <p className="text-center py-4 text-rose-500">Error: {error}</p>
        )}

        {/* Table List Section */}
        {!loading && !error && (
          <ProductList
            products={products}
            onDelete={handleDeleteProduct}
            onEdit={(product) => setEditingProduct(product)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
