import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/utils/authContext";
import { HOSTEL_BLOCKS } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Profile = () => {
  const { user, updateProfile, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [hostelType, setHostelType] = useState<"Male" | "Female" | undefined>(
    user?.hostelType
  );
  const [hostelBlock, setHostelBlock] = useState(user?.hostelBlock || "");
  const [mobileNumber, setMobileNumber] = useState(user?.mobileNumber || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user.isVerified) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user?.name) setName(user.name);
    if (user?.hostelType) setHostelType(user.hostelType);
    if (user?.hostelBlock) setHostelBlock(user.hostelBlock);
    if (user?.mobileNumber) setMobileNumber(user.mobileNumber);
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !hostelType || !hostelBlock || !mobileNumber) {
      return;
    }

    setIsSubmitting(true);

    try {
      updateProfile({
        name,
        hostelType,
        hostelBlock,
        mobileNumber,
      });

      navigate("/products");
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 animate-scale-in">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {user?.isProfileComplete ? "Edit Profile" : "Complete Your Profile"}
          </h1>

          {!user?.isProfileComplete && (
            <div className="bg-blue-50 p-4 rounded-md mb-6">
              <p className="text-sm text-blue-800">
                You need to complete your profile before you can list items or
                contact sellers.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Hostel Type
              </Label>
              <RadioGroup
                value={hostelType}
                onValueChange={(value) =>
                  setHostelType(value as "Male" | "Female")
                }
                className="flex gap-4"
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label
                htmlFor="hostelBlock"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Hostel Block
              </Label>
              <Select
                value={hostelBlock}
                onValueChange={setHostelBlock}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select hostel block" />
                </SelectTrigger>
                <SelectContent>
                  {HOSTEL_BLOCKS.map((block) => (
                    <SelectItem key={block} value={block}>
                      {block}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="mobileNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mobile Number
              </Label>
              <Input
                id="mobileNumber"
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Your mobile number"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                This will be visible to other users when they want to contact
                you about your listings.
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
