import { Dialog } from "@headlessui/react";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  if (!productDetails) return null;

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold">{productDetails.name}</h2>
          <p className="text-lg text-gray-600">Price: ₹{productDetails.price}</p>
          <p className="text-sm text-gray-500">Stock: {productDetails.stock}</p>
          <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default ProductDetailsDialog;
