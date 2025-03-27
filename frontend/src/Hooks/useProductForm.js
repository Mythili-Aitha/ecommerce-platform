import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addAdminProduct,
  getAdminProductForm,
  updateAdminProduct,
} from "../Utils/Api";
import formatProductData from "../Components/Admin/SideBarFiles/ProductandPage/ProductFormFiles/FormatProductData";

export const useProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    basicInfo: { title: "", description: "", category: "", brand: "" },
    pricing: { price: "", stock: "" },
    identifiers: { sku: "", tags: "" },
    dimensions: { width: "", height: "", depth: "" },
    metadata: { barcode: "", qrCode: "" },
    media: { images: "", thumbnail: "" },
    reviews: [
      {
        rating: "",
        comment: "",
        reviewerName: "",
        reviewerEmail: "",
      },
    ],
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (productId) fetchProductData();
  }, [productId]);

  const fetchProductData = async () => {
    try {
      const response = await getAdminProductForm(productId);
      setProduct(formatProductData(response.data));
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleGroupChange = (group) => (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [group]: { ...prev[group], [name]: value },
    }));
  };

  const handleReviewChange = (index, e) => {
    const { name, value } = e.target;
    setProduct((prev) => {
      const updatedReviews = [...prev.reviews];
      updatedReviews[index][name] = value;
      return { ...prev, reviews: updatedReviews };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const flattened = formatProductData(product);
      if (productId) {
        await updateAdminProduct(productId, flattened);
        console.log("edited product", flattened);
        setSnackbar({
          open: true,
          message: "Product updated successfully!",
          severity: "success",
        });
      } else {
        await addAdminProduct([flattened]);
        setSnackbar({
          open: true,
          message: "Product added successfully!",
          severity: "success",
        });
      }
      setTimeout(() => {
        navigate("/admin/products", { replace: true });
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error saving product:", error);
      setSnackbar({
        open: true,
        message: "Failed to save product.",
        severity: "error",
      });
    }
  };

  return {
    product,
    snackbar,
    setSnackbar,
    handleGroupChange,
    handleReviewChange,
    handleSubmit,
  };
};
