/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({ product, handleEdit, handleDelete }) {
  return (
    <Card className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden border border-[#D8D8D8]">
      <img
        src={product?.image}
        alt={product?.title}
        className="w-full h-64 object-cover"
        onError={(e) => (e.target.src = "/path/to/fallback-image.jpg")}
      />
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-[#333333] mb-2 text-center">{product?.title}</h2>
        <div className="flex justify-between items-center mb-2">
          <span className={`text-xl font-semibold ${product?.salePrice ? "line-through text-gray-500" : "text-black"}`}>
            ₹{product?.price}
          </span>
          {product?.salePrice && <span className="text-xl font-bold text-[#333333]">₹{product?.salePrice}</span>}
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between">
        <Button
          className="bg-[#4C9B76] text-white px-4 py-2 rounded-md font-medium hover:bg-[#3B7A5A]"
          onClick={() => handleEdit(product)}
        >
          Edit
        </Button>
        <Button
          className="bg-[#A0A0A0] text-black px-4 py-2 rounded-md font-medium hover:bg-[#828282]"
          onClick={() => handleDelete(product._id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
