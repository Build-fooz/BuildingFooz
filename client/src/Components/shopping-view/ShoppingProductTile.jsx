<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-white rounded-lg">
  {dummyProductList && dummyProductList.length > 0
    ? dummyProductList.map((productItem) => (
        <div
          key={productItem.id}
          className="border p-4 rounded-lg shadow-md flex flex-col items-center bg-[#F5F5F5]"
        >
          <img
            src={productItem.imageUrl} // Dummy image for each product
            alt={productItem.name}
            className="w-full h-48 object-cover rounded-md"
          />
          <h3 className="mt-2 text-lg font-semibold text-gray-800">{productItem.name}</h3>
          <p className="text-sm text-gray-600 mt-1">₹{productItem.price}</p> {/* Price in INR */}
          
          {/* Display price per gram */}
          <p className="text-sm text-gray-500 mt-1">₹{productItem.pricePerGram}/gram</p>

          {/* Star Rating Display */}
          <div className="mt-2 flex items-center">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`text-yellow-500 ${
                  index < Math.floor(productItem.rating)
                    ? "text-yellow-500"
                    : index < Math.ceil(productItem.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                {index < Math.floor(productItem.rating) ? "★" : "☆"}
              </span>
            ))}
            <span className="ml-2 text-sm text-gray-600">({productItem.rating})</span>
          </div>

          {/* Add to Cart Button */}
          <Button
            variant="outline"
            size="sm"
            className="mt-3 text-white bg-[#FF6347] hover:bg-[#FF4500]"
            onClick={() => handleAddtoCart(productItem.id, productItem.stock)}
          >
            Add to Cart
          </Button>
        </div>
      ))
    : <div className="col-span-full text-center text-gray-500">No products available.</div>}
</div>
