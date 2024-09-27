"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";

export default function NavigationBar() {
  const router = useRouter();

  // Function to handle the button click
  const handleSignupClick = () => {
    router.push("/sign-in"); // Navigate to the /sign-in page
  };

  const { isSignedIn, user } = useUser();

  return (
    <>
      <div className="w-screen h-[10vh] flex items-center justify-between px-5 lg:px-10 border-b-2 p-2 border-white/10">
        <div className="flex gap-2 items-center justify-center">
          <Link href={"/"}>
            <Image
              src={"/ecell.png"}
              alt="Description of the image"
              width={50}
              height={50}
            />
          </Link>
          <Link href={"https://www.ecell.in/mainpage/home"}>
            <Image
              src={"/iitb.png"}
              alt="Description of the image"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <div className="auh">
          {isSignedIn ? (
            <div className="flex font-medium lg:font-bold items-center justify-between gap-3 text-white">
              <h3>Welcome, {user.fullName}</h3>
              <UserButton/>
            </div>
          ) : (
            <Button onClick={handleSignupClick}>Sign In</Button>
          )}
        </div>
      </div>
    </>
  );
}
