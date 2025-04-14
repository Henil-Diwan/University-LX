import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useProducts } from "@/utils/productContext";
import { useAuth } from "@/utils/authContext";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, Plus } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const SavedProducts = () => {
  const { savedProducts } = useProducts();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user.isVerified) {
      navigate("/auth");
      return;
    }

    if (!user?.isProfileComplete) {
      navigate("/profile");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <>
      <Header />
      <main className="pt-20 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Saved Products</h1>

            <Button asChild size="sm">
              <Link to="/listing">
                <Plus className="h-4 w-4 mr-1" />
                Sell Item
              </Link>
            </Button>
          </div>

          {savedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {savedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookmarkIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No saved products yet
              </h3>
              <p className="text-gray-500 mb-6">
                Save interesting products to find them later
              </p>
              <Button asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SavedProducts;
