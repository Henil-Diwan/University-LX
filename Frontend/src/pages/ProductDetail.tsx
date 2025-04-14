import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProducts } from "@/utils/productContext";
import { useAuth } from "@/utils/authContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Bookmark,
  ArrowLeft,
  Trash2,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    products,
    isProductSaved,
    isProductLiked,
    toggleSave,
    toggleLike,
    deleteProduct,
    markAsSold,
  } = useProducts();
  const { user, isAuthenticated } = useAuth();

  const [product, setProduct] = useState(products.find((p) => p._id === id));

  useEffect(() => {
    const foundProduct = products.find((p) => p._id === id);

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate("/products");
      toast.error("Product not found");
    }
  }, [id, products, navigate]);

  if (!product) {
    return null;
  }

  const isSeller = user?._id === product.seller._id;

  const liked = isProductLiked(product._id);
  const saved = isProductSaved(product._id);

  const formattedDate = new Date(product.createdAt).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleSave = () => {
    if (!isAuthenticated || !user.isVerified) {
      toast.error("Please sign in to save products");
      return;
    }

    if (!user?.isProfileComplete) {
      toast.error("Please complete your profile first");
      return;
    }

    toggleSave(product._id);
  };

  const handleLike = () => {
    if (!isAuthenticated || !user.isVerified) {
      toast.error("Please sign in to like products");
      return;
    }

    if (!user?.isProfileComplete) {
      toast.error("Please complete your profile first");
      return;
    }

    toggleLike(product._id);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this listing?")) {
      deleteProduct(product._id);
      navigate("/products");
      toast.success("Listing deleted successfully");
    }
  };

  const handleMarkAsSold = () => {
    markAsSold(product._id);
    toast.success("Product marked as sold");
  };

  const handleContact = () => {
    if (!isAuthenticated || !user.isVerified) {
      toast.error("Please sign in to contact sellers");
      return;
    }

    if (!user?.isProfileComplete) {
      toast.error("Please complete your profile first");
      return;
    }

    const whatsappUrl = `https://wa.me/${product.sellerMobile.replace(
      /\D/g,
      ""
    )}?text=Hi! I'm interested in your "${
      product.title
    }" listing on Campus Exchange.`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <Header />
      <main className="pt-20 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="pl-0"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Products
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg overflow-hidden">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-auto max-h-[500px] object-contain"
                />
              ) : (
                <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg p-6 animate-fade-in">
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {product.category}
                  </Badge>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {product.title}
                  </h1>
                  <p className="text-2xl font-bold text-primary">
                    ₹{product.price}
                  </p>
                </div>

                {!isSeller && !product.isSold && (
                  <div className="flex space-x-2">
                    <Button
                      variant={saved ? "default" : "outline"}
                      size="icon"
                      onClick={handleSave}
                      className={saved ? "bg-primary text-white" : ""}
                    >
                      <Bookmark className="h-5 w-5" />
                    </Button>
                    <Button
                      variant={liked ? "default" : "outline"}
                      size="icon"
                      onClick={handleLike}
                      className={liked ? "bg-primary text-white" : ""}
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>

              {product.isSold && (
                <div className="mt-4 bg-red-50 text-red-700 px-4 py-2 rounded-md flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="font-medium">This item has been sold</span>
                </div>
              )}

              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Details</h2>
                <div className="text-gray-700 space-y-2">
                  <p className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    Listed on {formattedDate}
                  </p>
                  <p className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    {product.hostelType === "Male" ? "Men's" : "Women's"} hostel
                    • {product.hostelBlock}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                {!isSeller && !product.isSold ? (
                  <div>
                    <h2 className="text-lg font-semibold mb-2">
                      Seller Information
                    </h2>
                    <p className="text-gray-700 mb-1">{product.sellerName}</p>
                    {isAuthenticated &&
                    user.isVerified &&
                    user?.isProfileComplete ? (
                      <div className="flex items-center text-gray-700 mb-4">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        {product.sellerMobile}
                      </div>
                    ) : (
                      <p className="text-sm text-orange-600 mb-4">
                        Sign in and complete your profile to see seller's
                        contact info
                      </p>
                    )}

                    <Button
                      onClick={handleContact}
                      className="w-full mt-2"
                      disabled={!isAuthenticated || !user?.isProfileComplete}
                    >
                      Contact Seller on WhatsApp
                    </Button>
                  </div>
                ) : isSeller && !product.isSold ? (
                  <div className="space-y-3">
                    <h2 className="text-lg font-semibold">Owner Actions</h2>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button onClick={handleMarkAsSold} className="flex-1">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Sold
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleDelete}
                        className="flex-1"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Listing
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
