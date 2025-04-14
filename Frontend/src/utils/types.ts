
export type User = {
  _id: string;
  email: string;
  name?: string;
  hostelType?: "Male" | "Female";
  hostelBlock?: string;
  mobileNumber?: string;
  isProfileComplete: boolean;
  createdAt: Date;
  isVerified: boolean;
  updatedAt: Date;
};

export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: "Food" | "Books" | "Electronics" | "Notes" | "Others";
  hostelBlock: string;
  hostelType: "Male" | "Female";
  seller: {
    _id: string;
    name?: string;
    email: string;
  }; 
  sellerName: string;
  sellerMobile: string;
  isSold: boolean;
  likes: string[]; 
  savedBy: string[]; 
  createdAt: Date;
  updatedAt: Date;
};

export const HOSTEL_BLOCKS = [
  "A Block", "B Block", "C Block", "D Block", 
  "E Block", "F Block", "G Block", "H Block", "J Block", "K Block", "L Block", "M Block", "N Block", "P Block", "Q Block", "R Block", 
  "S Block", "T Block" 
];

export const CATEGORIES = [
  { value: "Food", label: "Food" },
  { value: "Books", label: "Books" },
  { value: "Electronics", label: "Electronics" },
  { value: "Notes", label: "Notes" },
  { value: "Others", label: "Others" }
];
