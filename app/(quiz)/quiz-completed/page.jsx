"use client";

import { Stack } from "@mui/material";
import { useClerk } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ImSpinner8 } from "react-icons/im";

export default function QuizCompleted() {
  const { signOut } = useClerk();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut();
        console.log("User logged out successfully");
        setLoading(false); 
      } catch (error) {
        console.error("Error logging out user:", error);
      }
    };
  
    const timeoutId = setTimeout(() => {
      handleLogout();
    }, 5000);
  
    toast.success("Quiz Completed Successfully!");
  
    return () => {
      console.log("Satendra");
      toast.dismiss(); 
      clearTimeout(timeoutId);
    };
  }, [signOut]);
  

  return (
    <>
      <Stack className="flex items-center justify-center h-[80vh] gap-2">
        <p className="text-3xl lg:text-7xl font-semibold text-white">
          Quiz Completed
        </p>
        <p className="text-xl font-semibold text-white/70">
          Result will be sent in the email.
        </p>
        <p className="text-2xl font-semibold text-orange-800"></p>
        <Button className="mt-3 flex gap-3" variant={"destructive"}>
          Signing Out <ImSpinner8 className={`${loading ? "animate-spin" : ""}`} />
        </Button>
      </Stack>
    </>
  );
}
