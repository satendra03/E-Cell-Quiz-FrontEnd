"use client"

import { useUser } from '@clerk/nextjs';
import { Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function MakeUserProfile() {
    const { user, isSignedIn } = useUser();
    const router = useRouter();

    

    if (isSignedIn) {
        const userEmail = user.primaryEmailAddress.emailAddress;
        const userName = user.fullName;
        console.log(" Use Email : ", userEmail)
        console.log(" User Name : ", userName)

        const requestBody = {
            // email: "hello@gmail.com"
            email: userEmail,
            name: userName
        }

        const url = process.env.NEXT_PUBLIC_BACKEND_URL;


        fetch(`${url}/make-user-profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include', // Include cookies in the request
            body: JSON.stringify(requestBody),
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                if (responseData.success == true) {
                    console.log("User Profile Created Successfully.")
                    router.push("/quiz")
                }

            })
    } else {
        router.push("/sign-in")
    }

    return (
        <>
            <Stack width="100vw" height="90vh" alignItems="center" justifyContent="center">
                <Stack width="800px" height="250px" alignItems="center" justifyContent="space-evenly" p="0px 20px 0px 20px" sx={{ border: "none", borderRadius: "7px", boxShadow: "4px 4px 12px black" }}>
                    <p className='text-2xl font-semibold text-orange-700' >Setting up few things</p>
                    <p className='text-xl font-semibold text-blue-800' >Loading....</p>
                </Stack>
            </Stack>
            
        </>
    )
}