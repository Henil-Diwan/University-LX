import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/utils/authContext";
import { useProducts } from "@/utils/productContext";
import { CATEGORIES } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";
import axios from "axios";

const ProductListing = () => {
  const { user, isAuthenticated } = useAuth();
  const { createProduct, fetchProducts } = useProducts();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user.isVerified) {
      navigate("/auth");
      return;
    }

    if (!user?.isProfileComplete) {
      toast.error("Please complete your profile first");
      navigate("/profile");
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || !category) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("hostelBlock", user?.hostelBlock || "Unknown");
    formData.append("hostelType", user?.hostelType || "Male");

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/products`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Product created successfully!");
        fetchProducts();
        navigate("/products");
      } else {
        throw new Error("Failed to create product");
      }
    } catch (error) {
      console.error("Product listing error:", error);
      toast.error("Failed to create listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 animate-scale-in">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            List an Item for Sale
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What are you selling?"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your item: condition, age, details, etc."
                className="min-h-32"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price (₹)
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="10"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {category === "Food" && (
                <p className="mt-1 text-xs text-orange-600">
                  Note: Food items are only visible to students in your hostel
                  block.
                </p>
              )}
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </Label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-700"
              />
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="text-sm text-gray-600 mb-4">
                <p>
                  <strong>Hostel information</strong> (auto-filled from your
                  profile)
                </p>
                <p>
                  {user?.hostelType === "Male" ? "Men's" : "Women's"} hostel •{" "}
                  {user?.hostelBlock}
                </p>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating Listing..." : "Create Listing"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductListing;
