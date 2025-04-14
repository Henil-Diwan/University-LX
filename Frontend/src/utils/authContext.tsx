import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { User } from "./types";


interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  register: (name: string, email: string, password: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await axios.get<User>(`${import.meta.env.VITE_BACKEND}/api/auth/getUser`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          setUser(data);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  
  const register = async (name: string, email: string, password: string) => {
    try {
      const { data } = await axios.post<{ user: User; token: string }>(`${import.meta.env.VITE_BACKEND}/api/auth/register`, {
        name,
        email,
        password,
      });
      
      await setUser(data.user);
      localStorage.setItem("tempUserId", data.user._id);
      toast.success("Registered successfully!");
      navigate("/verify");
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  
  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post<{ user: User; token: string }>(`${import.meta.env.VITE_BACKEND}/api/auth/login`, {
        email,
        password,
      });

      setUser(data.user);
      localStorage.setItem("token", data.token);
      toast.success("Logged in successfully!");

      navigate(data.user.isProfileComplete ? "/products" : "/profile");
    } catch (error: any) {
      console.error("Login failed:", error.response?.data?.message || error);
      toast.error(error.response?.data?.message || "Invalid credentials.");
    }
  };

  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const verifyOtp = async (otp: string) => {
    try {
      const userId = localStorage.getItem("tempUserId");

      if (!userId) {
        toast.error("Verification failed. Please register again.");
        return;
      }

      const { data } = await axios.post<{ user: User; token: string }>(`${import.meta.env.VITE_BACKEND}/api/auth/verify`, {
        userId,
        otp
      });
      
      setUser(data.user);
      localStorage.setItem("token", data.token);
      localStorage.removeItem("tempUserId");
      toast.success("Verified successfully!");
      navigate(data.user.isProfileComplete ? "/products" : "/profile");
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  
  const updateProfile = async (profileData: Partial<User>) => {
    if (!user) return;

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post<{ user: User }>(`${import.meta.env.VITE_BACKEND}/api/auth/updateProfile`, profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(data.user);
      toast.success("Profile updated successfully!");

      
      if (data.user.isProfileComplete) {
        navigate("/products");
      }
    } catch (error: any) {
      console.error("Profile update failed:", error.response?.data?.message || error);
      toast.error(error.response?.data?.message || "Profile update failed.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        verifyOtp,
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
