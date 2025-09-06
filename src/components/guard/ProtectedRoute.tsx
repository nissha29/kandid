'use client'

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/store";
import axios from "axios";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { setUser } = useAuthStore();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        router.replace("/");
        return;
      }

      try {
        const response = await axios.get("/api/auth/user", {
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
          }
        });
        setUser(response.data.user);
      } catch (err) {
        console.log(err);
        toast.error("User fetch error:");
        router.replace("/");
      }
    };

    checkUser();
  }, [router, setUser]);

  return <>{children}</>;
}
