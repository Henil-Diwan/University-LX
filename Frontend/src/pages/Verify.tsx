import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/utils/authContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { validateEmail } from "@/utils/checkEmail";
import { toast } from "sonner";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, verifyOtp } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Enter an Otp");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

    try {
      verifyOtp(otp);
    } catch (error) {
      console.error("Verification error:", error);
      toast.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="pt-16 flex flex-col min-h-screen">
        <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 animate-scale-in">
            <div className="text-center">
              <div className="flex justify-center">
                <ShoppingBag className="h-12 w-12 text-primary" />
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Verify Your Account
              </h2>
              <p className="mt-2 text-sm text-gray-600">Otp valid for 1 hour</p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md -space-y-px">
                <div className="mb-4">
                  <Label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Otp
                  </Label>
                  <Input
                    id="otp"
                    name="otp"
                    type="text"
                    autoComplete="otp"
                    required
                    placeholder="Enter Otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Verify;
