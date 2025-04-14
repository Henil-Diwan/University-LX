import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "./types";
import { useAuth } from "./authContext";
import axios from "axios";
import { toast } from "sonner";

type ProductContextType = {
  products: Product[];
  fetchProducts: () => void;
  userProducts: Product[];
  savedProducts: Product[];
  showSameHostel: boolean;
  toggleSameHostel: () => void;
  createProduct: (product: Omit<Product, "id" | "seller" | "sellerName" | "sellerMobile" | "likes" | "savedBy" | "createdAt" | "updatedAt" | "isSold">) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  markAsSold: (id: string) => void;
  toggleSave: (id: string) => void;
  toggleLike: (id: string) => void;
  isProductSaved: (id: string) => boolean;
  isProductLiked: (id: string) => boolean;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [showSameHostel, setShowSameHostel] = useState(false);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND}/api/products`);
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const userProducts = user ? products.filter(product => product.seller._id === user._id) : [];
  const savedProducts = user ? products.filter(product => product.savedBy.includes(user._id)) : [];

  const filteredProducts = showSameHostel && user?.hostelBlock 
    ? products.filter(product => product.hostelBlock === user.hostelBlock && !product.isSold) 
    : products.filter(product => !product.isSold);

  const toggleSameHostel = () => {
    setShowSameHostel(prev => !prev);
  };

  const createProduct = async (productData: Omit<Product, "_id" | "seller" | "sellerName" | "sellerMobile" | "likes" | "savedBy" | "createdAt" | "updatedAt" | "isSold">) => {
    if (!user || !user.isProfileComplete) {
      toast.error("Please complete your profile first.");
      return;
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND}/api/products`, productData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProducts(prev => [...prev, data]);
        toast.success("Product listed successfully!");
        fetchProducts();
        
      } catch (error) {
        toast.error("Failed to list product.");
        console.error(error);
      }
    };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_BACKEND}/api/products/${id}`, updates, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts(prev => prev.map(p => (p._id === id ? data : p)));
      toast.success("Product updated successfully!");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to update product.");
      console.error(error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts(prev => prev.filter(p => p._id !== id));
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product.");
      console.error(error);
    }
  };

  const markAsSold = async (id: string) => {
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_BACKEND}/api/products/${id}/sold`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts(prev => prev.map(p => (p._id === id ? data : p)));
      toast.success("Product marked as sold!");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to mark as sold.");
      console.error(error);
    }
  };

  const toggleSave = async (id: string) => {
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_BACKEND}/api/products/${id}/save`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts(prev => prev.map(p => (p._id === id ? data : p)));
      toast.success("Product saved!");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to save product.");
      console.error(error);
    }
  };

  const toggleLike = async (id: string) => {
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_BACKEND}/api/products/${id}/like`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts(prev => prev.map(p => (p._id === id ? data : p)));
      toast.success("Product liked!");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to like product.");
      console.error(error);
    }
  };

  const isProductSaved = (id: string) => {
    const product = products.find(p => p._id === id);
    return product ? product.savedBy.includes(user?._id || '') : false;
  };

  const isProductLiked = (id: string) => {
    const product = products.find(p => p._id === id);
    return product ? product.likes.includes(user?._id || '') : false;
  };

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts,
        userProducts,
        fetchProducts,
        savedProducts,
        showSameHostel,
        toggleSameHostel,
        createProduct,
        updateProduct,
        deleteProduct,
        markAsSold,
        toggleSave,
        toggleLike,
        isProductSaved,
        isProductLiked,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};