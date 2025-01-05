import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductImageUpload from "../../components/admin-view/image-upload";
import AdminProductTile from "../../components/admin-view/product-tile";
import CommonForm from "../../components/common/form";
import { Button } from "../../components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../../components/ui/sheet";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "../../store/admin/products-slice";
import { addProductForm } from "../../config";
import { motion } from "framer-motion";
import StatCard from "../../Components/admin-view/StatCard";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import SalesTrendChart from "../../Components/admin-view/SalesTrendChart";
const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  price: "",
  salePrice: "",
  discount: "", 
  totalStock: "",
  outofStock: false,
  bestseller: false, 
  averageReview: 0,
};

function AdminProducts() {
  const [CreateProductDialogOpen, setIsCreateProductDialogOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  // Adding and deleting a product
  function onSubmit(event) {
    event.preventDefault();

    const productData = {
      id: currentEditedId || new Date().getTime().toString(),
      ...formData,
      image: uploadedImageUrl || formData.image,
      outofStock: formData.totalStock <= 0,
    };

    const action = currentEditedId ? editProduct(productData) : addNewProduct(productData);
    dispatch(action).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts()); // Refresh product list
        resetForm();
        const successMessage = currentEditedId
          ? "Product edited successfully"
          : "Product added successfully";
        toast.success(successMessage);
      } else {
        toast.error("Failed to save product. Check image upload.");
      }
    });
  }

  // Resets form to initial state and closes dialog
  function resetForm() {
    setFormData(initialFormData);
    setImageFile(null);
    setUploadedImageUrl("");
    setCurrentEditedId(null);
    setIsCreateProductDialogOpen(false);
  }

  // Product image and details editing
  function Edit(product) {
    setCurrentEditedId(product.id);
    setFormData(product);
    setUploadedImageUrl(product.image);
    setIsCreateProductDialogOpen(true);
  }

  // Delete Product
  function Delete(productId) {
    dispatch(deleteProduct(productId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast.info("Product deleted successfully");
      } else {
        toast.error("Failed to delete product.");
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((key) => key !== "averageReview")
      .every((key) => formData[key] !== "");
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    
    <Fragment>
      <div>
            <motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard label='Total Products' icon={Package} value={1234} color='#6366F1' />
					<StatCard label='Top Selling' icon={TrendingUp} value={89} color='#10B981' />
					<StatCard label='Low Stock' icon={AlertTriangle} value={23} color='#F59E0B' />
					<StatCard label='Total Revenue' icon={DollarSign} value={"₹543,210"} color=' rgba(40, 20, 100, 0.)' />
				</motion.div>
      </div>
      <ToastContainer />
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setIsCreateProductDialogOpen(true)}>Add New Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList?.length > 0 &&
          productList.map((productItem, index) => (
            <AdminProductTile
              key={productItem.id || `${productItem.title}-${productItem.category}-${index}`}
              product={productItem}
              setFormData={setFormData}
              setOpenCreateProductsDialog={setIsCreateProductDialogOpen}
              setCurrentEditedId={setCurrentEditedId}
              handleDelete={Delete}
              handleEdit={Edit}
            />
          ))}
      </div>
      {/* Add/Edit Product Dialog */}
      <Sheet open={CreateProductDialogOpen} onOpenChange={resetForm}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add"}
            </SheetTitle>
            <SheetDescription>
              {currentEditedId !== null
                ? "Edit product details below"
                : "Fill in the details to add a new product"}
            </SheetDescription>
          </SheetHeader>
          {/* Image Upload Section */}
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          {/* Form Section */}
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductForm}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
      <div className='w-full h-80'>
					<SalesTrendChart />
				</div>
    </Fragment>
  );
}

export default AdminProducts;
