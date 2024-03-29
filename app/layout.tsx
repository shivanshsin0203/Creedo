import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"


import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Inter } from "next/font/google";
import "./globals.css";
import reddit from "../public/reddit.png";
import Image from "next/image";
import Navicons from "@/components/Navicons";
import { BsThreeDots } from "react-icons/bs";
import Sidebar from "@/components/Sidebar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Creddo",
  description: "Creddo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-[#0B1416] flex flex-row justify-between p-4 items-center h-[49px] fixed top-0 left-0 right-0 z-50 w-screen ">
          <div className="flex space-x-3 items-center cursor-pointer">
            <Image src={reddit} alt="Reddit png" width={39} height={39} />
            <span className="text-2xl font-extrabold text-white">creedo</span>
          </div>
          <div className="flex items-center hidden md:block lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Creedo"
                className="bg-gray-700 text-white border border-gray-600 rounded-full py-1 px-3 focus:outline-none focus:border-blue-500 w-[878px] h-[38px]"
              />
              <div className="absolute top-0 right-0 mt-3 mr-4 text-white">
                {/* Add your search icon here */}
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M14.086 12.73a8 8 0 111.415-1.415l5.85 5.85-1.415 1.415-5.85-5.85zM15 8a7 7 0 10-14 0 7 7 0 0014 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div>
            <Navicons />
          </div>
        </nav>
        <div className="border-[1.5px] border-gray-600 mt-[49px]"></div>
         <div className=" flex flex-row"> 
         <div className="fixed top-[49px] left-0 bottom-0 md:w-[18%] lg:w-[18%] h-screen opacity-100 bg-black flex row hidden lg:block md:block ">
          <Sidebar/>
         </div>
         <div className="border-[1.1] border-gray-600  h-full md:ml-[18%] lg:ml-[18%] hidden md:block lg:block">
         </div>
         
        {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
