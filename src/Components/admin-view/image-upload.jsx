/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    if (!imageFile) return;
    setImageLoadingState(true);
    try {
      const data = new FormData();
      data.append("my_file", imageFile);
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );
      if (response?.data?.success) {
        setUploadedImageUrl(response.data.result.url);
      }
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setImageLoadingState(false);
    }
  }

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 text-[#333333]">
        Upload Image
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed border-[#DC143C] rounded-lg p-4 ${
          isEditMode ? "opacity-60" : ""
        }`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center h-32 cursor-pointer text-[#333333] ${
              isEditMode ? "cursor-not-allowed" : ""
            }`}
          >
            <UploadCloudIcon className="w-10 h-10 text-[#333333] mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <div className="flex justify-center items-center h-32">
            <ThreeDots
              height="50"
              width="50"
              color="#DC143C"
              ariaLabel="loading"
              visible={true}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-[#DC143C] mr-2 h-8" />
            </div>
            <p className="text-sm font-medium text-[#333333]">
              {imageFile.name}
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#333333] hover:text-[#DC143C]"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
      <Button
        onClick={uploadImageToCloudinary}
        disabled={imageLoadingState || !imageFile}
        className="mt-4 w-full bg-[#DC143C] text-white hover:bg-[#B22222]"
      >
        Upload Image
      </Button>
    </div>
  );
}

export default ProductImageUpload;
