import localFont from "next/font/local";
import "./globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs'
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "E-Quest | E-Cell JEC",
  description: "Join us for an exciting quiz competition organized by E-Cell JEC! Test your knowledge, compete with peers, and win amazing prizes. Open to all students, this event promotes entrepreneurship and innovation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <NavigationBar/>
            {children}
            <Footer/>
            <Toaster/>
        </body>
      </ClerkProvider>
    </html>
  );
}
