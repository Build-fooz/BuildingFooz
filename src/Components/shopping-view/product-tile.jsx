// product-tile.jsx
/* eslint-disable react/prop-types */
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-md rounded-lg transition-shadow hover:shadow-lg">
      <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
              {`Only ${product?.totalStock} left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-green-500 text-white">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2 text-gray-600">
            <span className="text-sm">{categoryOptionsMap[product?.category]}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-lg font-semibold ${product?.salePrice > 0 ? "line-through text-gray-500" : "text-gray-800"}`}>
              ${product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-lg font-bold text-primary">
                ${product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-4">
        {product?.totalStock === 0 ? (
          <Button className="w-full bg-gray-300 cursor-not-allowed" disabled>
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
