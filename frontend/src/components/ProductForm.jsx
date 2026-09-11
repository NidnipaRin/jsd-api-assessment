import React, { useState, useEffect } from "react";

function ProductForm({ onSubmit, editingProduct, onCancelEdit }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setQuantity(editingProduct.quantity);
    } else {
      resetForm();
    }
  }, [editingProduct]);

  const resetForm = () => {
    setName("");
    setPrice("");
    setQuantity(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || price === "") return alert("กรุณากรอกข้อมูลให้ครบถ้วน");

    onSubmit({
      name,
      price: Number(price),
      quantity: Number(quantity),
    });

    resetForm();
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-3">
        {editingProduct ? "Edit Product Here" : "Create Product Here"}
      </h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3 items-center"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:border-purple-500 text-sm"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:border-purple-500 text-sm"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:border-purple-500 text-sm"
          required
        />

        <div className="flex gap-2 w-full md:w-auto">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md text-sm transition-colors cursor-pointer"
          >
            Save
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="w-full md:w-auto px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded-md text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
