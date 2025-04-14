import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "@/utils/productContext";
import { useAuth } from "@/utils/authContext";
import { CATEGORIES } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, Plus, Filter, X } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const Products = () => {
  const { products, showSameHostel, toggleSameHostel } = useProducts();

  const { user } = useAuth();

  const isMobile = useIsMobile();
  

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchTerm === "" ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortBy === "price-low") {
      return a.price - b.price;
    } else if (sortBy === "price-high") {
      return b.price - a.price;
    }
    return 0;
  });

  const checkToggle = () => {
    if(!user){
      toast.error("You Are Not Logged In")
    }
  };

  return (
    <>
      <Header />
      <main className="pt-20 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          { isMobile ?
              <Button asChild size="sm">
                <Link to="/listing">
                  <Plus className="h-4 w-4 mr-1" />
                  Sell Item
                </Link>
              </Button>
               : <></>}
               { isMobile ?

<div className="flex flex-wrap gap-4 mb-4">
  <div className="relative flex-1 min-w-[200px]">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
    <Input
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="pl-9"
    />
    {searchTerm && (
      <button
        onClick={() => setSearchTerm("")}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <X className="h-4 w-4" />
      </button>
    )}
  </div>
</div>

: <></>}
            <h1 className="text-2xl font-bold text-gray-900">
              Browse Products
            </h1>

            <div className={isMobile ? "flex justify-between" : "flex flex-col sm:flex-row gap-2"}>
              <div className="flex items-center gap-2">
                <Switch
                  id="hostel-mode"
                  checked={showSameHostel}
                  onCheckedChange={() => {
                    if (!user?.isProfileComplete) {
                      toast.error("You Are Not Logged In or Profile Is Incomplete");
                    } else {
                      toggleSameHostel();
                    }
                  }}
                />
                <Label
                  htmlFor="hostel-mode"
                  className="text-sm font-medium cursor-pointer"
                >
                  Same Hostel Mode
                </Label>

              </div>

              <Button
                variant="outline"
                size="sm"
                className={isMobile ? "w-3 border-none bg-none" : "md:ml-2"}
                onClick={() => setShowFilters(!showFilters)}
                >
                <Filter className="h-4 w-4 mr-1" />
                {!isMobile ? showFilters ? "Hide Filters" : "Show Filters" : null}
              </Button>

                  { !isMobile ?
                    <Button asChild size="sm">
                    <Link to="/listing">
                    <Plus className="h-4 w-4 mr-1" />
                  Sell Item
                </Link>
              </Button>
               : <></>}
            </div>
          </div>

          { !isMobile ?

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          : <></>}

          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6 animate-fade-in flex flex-wrap gap-4">
              <div className="min-w-[200px] flex-1">
                <Label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="min-w-[200px] flex-1">
                <Label
                  htmlFor="sort"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Sort By
                </Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedCategory !== "all" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 mt-6"
                  onClick={() => setSelectedCategory("all")}
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear filter
                </Button>
              )}
            </div>
          )}

          {showSameHostel && user?.hostelBlock && (
            <div className="mb-6">
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                Showing products for{" "}
                {user.hostelType === "Male" ? "Men's" : "Women's"} hostel •{" "}
                {user.hostelBlock}
              </Badge>
            </div>
          )}

          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your search or filters"
                  : "Be the first to list a product!"}
              </p>
              <Button asChild>
                <Link to="/listing">
                  <Plus className="h-4 w-4 mr-1" />
                  List an Item
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
