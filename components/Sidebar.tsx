"use client";
import { GoRepoPush } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { FaPeopleArrows } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import exp from "constants";
import { RegisterLink,LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "./ui/button";

const Sidebar = () => {
    const {
        permissions,
        
        user,
    
        isAuthenticated,
      } = useKindeBrowserClient();
      console.log(user?.picture)
      
      const router = useRouter();
  return (
    <>
    {isAuthenticated?
    <div className="flex flex-col space-y-4 mt-3 pt-3 pr-5">
      <div className="flex space-x-11 rounded-md hover:bg-slate-600 active:bg-slate-500 items-center justify-start ml-4 h-9 cursor-pointer" onClick={()=>{router.push('/')}}>
        <IoHomeOutline className="text-xl text-white ml-3 " />
        <span className="text-white text-lg font-normal">Home</span>
      </div>
      <div className="flex space-x-11 rounded-md  hover:bg-slate-600 active:bg-slate-500 items-center justify-start ml-4 h-9 cursor-pointer">
        <GoRepoPush className="text-xl text-white ml-3 " />
        <span className="text-white text-lg font-normal">Popular</span>
      </div>
      <div className="border-[1.5px] border-gray-600 "></div>
      <div className=" text-gray-500 text-start font-medium text-sm pl-3">
        FEATURES
      </div>
      <div className="flex space-x-11 rounded-md  hover:bg-slate-600 active:bg-slate-500 items-center justify-start ml-4 h-9 cursor-pointer" onClick={()=>{router.push('/profile')}}>
        <CgProfile className="text-xl text-white ml-3 " />
        <span className="text-white text-lg font-normal">Profile</span>
      </div>
      <div className="flex space-x-11 rounded-md  hover:bg-slate-600 active:bg-slate-500 items-center justify-start ml-4 h-9 cursor-pointer">
        <ChatBubbleIcon className="text-xl text-white ml-3 " />
        <span className="text-white text-lg font-normal">Chats</span>
      </div>
      <div className="flex space-x-11 rounded-md  hover:bg-slate-600 active:bg-slate-500 items-center justify-start ml-4 h-9 cursor-pointer">
        <IoIosNotifications className="text-xl text-white ml-3 " />
        <span className="text-white text-lg font-normal">Notification</span>
      </div>
      <div className="flex space-x-11 rounded-md  hover:bg-slate-600 active:bg-slate-500 items-center justify-start ml-4 h-9 cursor-pointer">
        <FaPeopleArrows className="text-xl text-white ml-3 " />
        <span className="text-white text-lg font-normal">Connections</span>
      </div>
       <div className="border-[1.5px] border-gray-600 "></div>
      <div >
        <Avatar className=" ml-[43%] mt-11">
          <AvatarImage src={user?.picture} />
          <AvatarFallback>{user?.given_name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div className=" text-slate-400 text-center font-medium text-sm pl-3">
         {`Hey ${user?.given_name} ${user?.family_name}`}
      </div>
      <div className=" ml-5 pl-4">
        <LogoutLink className="bg-slate-600 text-destructive-foreground shadow-sm  hover:scale-105 hover:bg-destructive transition-all w-[90%]  mt-9 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2">
            Logout
        </LogoutLink>
        </div>
        <div className=" font-extralight text-sm text-start text-slate-500 p-1">
            {`signed in as ${user?.email}`}
        </div>
    </div>:
    <div className="flex flex-col space-y-4 mt-3 pt-3 pr-5">
    <div className="flex space-x-11 rounded-md hover:bg-slate-600 active:bg-slate-500 items-center justify-start ml-4 h-9 cursor-pointer">
      <IoHomeOutline className="text-xl text-white ml-3 " />
      <span className="text-white text-lg font-normal">Home</span>
    </div>
    <div className="flex space-x-11 rounded-md  hover:bg-slate-600 active:bg-slate-500 items-center justify-start ml-4 h-9 cursor-pointer">
      <GoRepoPush className="text-xl text-white ml-3 " />
      <span className="text-white text-lg font-normal">Popular</span>
    </div>
    <div className="border-[1.5px] border-gray-600 "></div>
    <div className=" text-gray-500 text-start font-medium text-sm pl-3">
      FEATURES
    </div>
    <div className="flex space-x-11 rounded-md  hover:bg-slate-600 active:bg-slate-500 items-center justify-start ml-4 h-9 cursor-pointer">
      <CgProfile className="text-xl text-white ml-3 " />
      <span className="text-white text-lg font-normal">Profile</span>
    </div>
    <div className="flex space-x-11 rounded-md  hover:bg-slate-600 active:bg-slate-500 items-center justify-start ml-4 h-9 cursor-pointer">
      <ChatBubbleIcon className="text-xl text-white ml-3 " />
      <span className="text-white text-lg font-normal">Chats</span>
    </div>
    <div className="flex space-x-11 rounded-md  hover:bg-slate-600 active:bg-slate-500 items-center justify-start ml-4 h-9 cursor-pointer">
      <IoChatbubbleEllipsesOutline className="text-xl text-white ml-3 " />
      <span className="text-white text-lg font-normal">Notification</span>
    </div>
    <div className="flex space-x-11 rounded-md  hover:bg-slate-600 active:bg-slate-500 items-center justify-start ml-4 h-9 cursor-pointer">
      <FaPeopleArrows className="text-xl text-white ml-3 " />
      <span className="text-white text-lg font-normal">Connections</span>
    </div>
    <div className=" ml-5 pl-4">
        <RegisterLink className="bg-slate-600 text-destructive-foreground shadow-sm  hover:scale-105 hover:bg-orange-400 transition-all w-[90%]  mt-9 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2">
            Sign In
        </RegisterLink>
        </div>
  </div>}
    </>
  );
};
export default Sidebar;
