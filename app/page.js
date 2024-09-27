"use client";

import { Stack } from "@mui/material";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { ImSpinner8 } from "react-icons/im";

export default function Home() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  if (isSignedIn) {
    // console.log("Loggedin user", user);
    
    // console.log(" User Name : ", user.fullName);
    const userEmail = user.primaryEmailAddress.emailAddress;
    // console.log(" Use Email : ", userEmail);

    const requestBody = {
      // email: "hello@gmail.com"
      email: userEmail,
    };

    const url = process.env.NEXT_PUBLIC_BACKEND_URL;

    fetch(`${url}/check-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies in the request
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if (responseData.data == null) {
          console.log("New User");
          router.push("/make-user-profile");
        } else if (responseData.data != null) {
          console.log("Already participated in Quiz");
          router.push("/already-participated");
        }
      });
  } else {
    // router.push("/sign-in")
  }

  const handleClick = () => {
    toast.error("Sign In First")
    router.push("/sign-in");
  }

  return (
    <>
      {isSignedIn ? (
         <Stack className="h-[80vh] flex items-center justify-center">
         <div className="w-full h-full flex gap-3 items-center justify-center">
           <div className="text flex flex-col items-center gap-5">
             <div className="text text-center">
               <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-8xl text-white shadow-lg">
                 E-Quest
               </h1>
               <p className="text-md lg:text-xl text-white/70 max-w-[60vw]">
               E-Quest is an engaging and interactive quiz competition organized by <br/> <b>the E-Cell of Jabalpur Engineering College.</b>
               </p>
             </div>
             <Button disabled className="w-fit " >Loading Quiz <ImSpinner8 className={`animate-spin`} /></Button>
           </div>
         </div>
       </Stack>
      ) : (
        <Stack className="h-[80vh] flex items-center justify-center">
        <div className="w-full h-full flex gap-3 items-center justify-center">
          <div className="text flex flex-col items-center gap-5">
            <div className="text text-center">
              <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-8xl text-white shadow-lg">
                E-Quest
              </h1>
              <p className="text-md lg:text-xl text-white/70 max-w-[60vw]">
              E-Quest is an engaging and interactive quiz competition organized by <br/> <b>the E-Cell of Jabalpur Engineering College.</b>
              </p>
            </div>
            <Button className="w-fit " onClick={handleClick}>Start Quiz</Button>
          </div>
        </div>
      </Stack>
      )
      }
     
    </>
  );
}
