import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { addProductFormElements } from "@/config";

// Initial form data
const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [isCreateProductDialogOpen, setIsCreateProductDialogOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  // Function to handle both adding and editing
  function onSubmit(event) {
    event.preventDefault();

    const productData = {
      id: currentEditedId,
      ...formData,
      image: uploadedImageUrl || formData.image,
    };

    const action = currentEditedId ? editProduct(productData) : addNewProduct(productData);

    dispatch(action).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts()); // Refresh product list
        resetForm();
        const successMessage = currentEditedId ? "Product edited successfully" : "Product added successfully";
        toast.success(successMessage);
      } else {
        toast.error("Failed to save product. Check image upload.");
      }
    });
  }

  // Function to reset form and close dialog
  function resetForm() {
    setFormData(initialFormData);
    setImageFile(null);
    setUploadedImageUrl("");
    setCurrentEditedId(null);
    setIsCreateProductDialogOpen(false);
  }

  // Function to handle opening edit mode
  function handleEdit(product) {
    setCurrentEditedId(product.id);
    setFormData(product);
    setUploadedImageUrl(product.image); // Use the existing image URL if in edit mode
    setIsCreateProductDialogOpen(true);
  }

  // Function to handle product deletion
  function handleDelete(productId) {
    dispatch(deleteProduct(productId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast.info("Product deleted successfully");
      } else {
        toast.error("Failed to delete product.");
      }
    });
  }

  // Validate form data
  function isFormValid() {
    return Object.keys(formData)
      .filter((key) => key !== "averageReview")
      .every((key) => formData[key] !== "");
  }

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
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
              handleDelete={handleDelete}
              handleEdit={handleEdit} // Added handleEdit for editing action
            />
          ))}
      </div>
      <Sheet
        open={isCreateProductDialogOpen}
        onOpenChange={resetForm} // Reset only on close
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>{currentEditedId !== null ? "Edit Product" : "Add New Product"}</SheetTitle>
            <SheetDescription>
              {currentEditedId !== null ? "Edit product details below" : "Fill in the details to add a new product"}
            </SheetDescription>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
