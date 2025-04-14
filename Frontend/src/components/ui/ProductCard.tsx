import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/utils/types";
import { useProducts } from "@/utils/productContext";
import { useAuth } from "@/utils/authContext";
import { Heart, Bookmark, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isAuthenticated, user } = useAuth();
  const { isProductSaved, isProductLiked, toggleSave, toggleLike } =
    useProducts();

  const liked = isProductLiked(product._id);
  const saved = isProductSaved(product._id);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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

  return (
    <Link to={`/product/${product._id}`}>
      <div className="rounded-lg overflow-hidden bg-white card-shadow hover-scale h-full flex flex-col">
        <div className="relative aspect-video w-full overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}

          <div className="absolute top-2 right-2 flex gap-1">
            <button
              onClick={handleSave}
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                saved
                  ? "bg-primary text-white"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white"
              }`}
            >
              <Bookmark className="h-4 w-4" />
            </button>

            <button
              onClick={handleLike}
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                liked
                  ? "bg-primary text-white"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white"
              }`}
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>

          <div className="absolute bottom-2 left-2">
            <Badge
              variant="secondary"
              className="bg-white/80 backdrop-blur-sm text-gray-700"
            >
              {product.category}
            </Badge>
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-lg">{product.title}</h3>
            <span className="font-bold text-lg">₹{product.price}</span>
          </div>

          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-auto pt-4 flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {product.hostelType === "Male" ? "Men's" : "Women's"} hostel •{" "}
              {product.hostelBlock}
            </div>

            <Button variant="ghost" size="sm" className="text-primary" asChild>
              <span className="flex items-center text-xs">
                View <ExternalLink className="ml-1 h-3 w-3" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
