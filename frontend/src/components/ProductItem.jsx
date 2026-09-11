import React from "react";

function ProductItem({ product, onDelete, onEdit }) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6 text-center text-gray-800 text-sm">
        {product.name}
      </td>
      <td className="py-4 px-6 text-center text-gray-800 text-sm">
        {product.price}
      </td>
      <td className="py-4 px-6 text-center text-gray-800 text-sm">
        {product.quantity}
      </td>
      <td className="py-4 px-6 text-center text-sm font-semibold space-x-3">
        <button
          onClick={() => onEdit(product)}
          className="text-amber-600 hover:text-amber-800 cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="text-rose-500 hover:text-rose-700 cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ProductItem;
