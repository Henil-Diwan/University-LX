import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShoppingBag,
  Shield,
  Search,
  MessageCircleMore,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="bg-gradient-to-br from-blue-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Buy and sell items within your campus
                </h1>
                <p className="mt-4 text-xl text-gray-600 max-w-lg">
                  Connect with students in your hostel and across campus. Buy,
                  sell, and exchange items easily.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link to="/products">
                      Browse Products <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/auth">Sign In</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 mt-10 md:mt-0">
                <div className="relative">
                  <div className="w-full h-full absolute -top-2 -left-2  rounded-lg" />
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                    alt="Students trading items"
                    className="rounded-lg w-full relative z-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-gray-900 mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-primary mb-4">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Browse Listings</h3>
                <p className="text-gray-600">
                  Find products from all hostels or toggle to see only items in
                  your hostel block.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-primary mb-4">
                  <MessageCircleMore className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Chat with Seller</h3>
                <p className="text-gray-600">
                  Chat with sellers directly through WhatsApp. Arrange meetups
                  within campus.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-primary mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Collect Items Securely
                </h3>
                <p className="text-gray-600">
                  Meet the seller in your hostel common area and collect items
                  securey.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to start buying and selling?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Join your campus marketplace today. It only takes a minute to get
              started.
            </p>
            <Button size="lg" asChild>
              <Link to="/auth">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
