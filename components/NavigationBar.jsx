"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function NavigationBar() {
  const router = useRouter();

  // Function to handle the button click
  const handleSignupClick = () => {
    router.push("/sign-in"); // Navigate to the /sign-in page
  };

  const { isSignedIn } = useUser();

  return (
    <>
      <div className="w-screen h-[10vh] flex items-center justify-between px-5 lg:px-10 border-b-2 p-2 border-white/10">
        <h3 className="scroll-m-20 text-xl lg:text-2xl font-semibold tracking-tight ">
          <Link href={"/"}>
            <Image
              src={"/ecell.png"}
              alt="Description of the image"
              width={50}
              height={50}
            />
          </Link>
        </h3>
        <div className="auh">
          {isSignedIn ? (
            <Image
              src={"/iitb.png"}
              alt="Description of the image"
              width={50}
              height={50}
            />
          ) : (
            <Button onClick={handleSignupClick}>Sign In</Button>
          )}
        </div>
      </div>
    </>
  );
}
