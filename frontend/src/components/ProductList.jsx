import React from "react";
import ProductItem from "./ProductItem";

function ProductList({ products, onDelete, onEdit }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 border border-gray-200 rounded-md">
        No products available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-md">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-200 border-b border-gray-200 text-gray-800">
          <tr>
            <th className="py-3 px-6 text-center font-bold">Name</th>
            <th className="py-3 px-6 text-center font-bold">Price</th>
            <th className="py-3 px-6 text-center font-bold">Quantity</th>
            <th className="py-3 px-6 text-center font-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
