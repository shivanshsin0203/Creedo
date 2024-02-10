"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { IoIosNotifications } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { io } from "socket.io-client";
import { toast } from "sonner";
import axios from "axios";
import { useEffect, useState,Suspense } from "react";

const Navicons = () => {
  const {
    permissions,
    isLoading,
    user,
    accessToken,
    organization,
    userOrganizations,
    getPermission,
    getBooleanFlag,
    getIntegerFlag,
    getFlag,
    getStringFlag,
    getClaim,
    getAccessToken,
    getToken,
    getIdToken,
    getOrganization,
    getPermissions,
    getUserOrganizations,
    isAuthenticated,
  } = useKindeBrowserClient();
  // Empty dependency array ensures the effect runs only once on mount
  const router = useRouter();
  const [socket, setSocket] = useState<any>(null);
  const [newConnection, setNewConnection] = useState<boolean>(false);
  const [notification, setNotification] = useState<any>(0);
  useEffect(() => {
    if (!isLoading) {
      toast("You are Signed In");
    }
  }, [isLoading]);
  useEffect(() => {
    const newSocket = io("http://localhost:3001", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    });

    newSocket.on("connect", () => {
      console.log("connected");
    });
    newSocket.on("recived_frequest", (data) => {
      if(data.to === user?.email){
        toast("You have recived new friend request");
        setNewConnection(true);
      }
    });
    newSocket.on('recived_new_post',async (data)=>{
      const result= await axios.post('http://localhost:3005/isfriend',{freind:data.creator,user:user?.email})
      if(result.data.result){
        setNotification(notification+1);
        toast(`You have recived new post from ${data.name} `);
      }
    })
    newSocket.on('new_comment', (data)=>{
      if(data.creator === user?.email){
        setNotification(notification+1);
        toast(`You have recived new comment on post `);
      }
    })
    setSocket(newSocket);
  }, [user]);

  if (isAuthenticated) {
    if (isLoading) {
      return <div className=" text-slate-100 font-thin">Loading..</div>;
    }
  }

  return (
    <>
      {isAuthenticated ? (
        <div className="flex space-x-5 items-center justify-center pr-3">
          <div className="flex flex-col">
          <FaUserFriends
            className="cursor-pointer text-2xl hover:scale-125 hover:text-slate-300 transition-all text-white"
            onClick={() => {
               setNewConnection(false);
              router.push("/connection");
            }}
          />{newConnection?<div className="absolute shadow w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 
          bg-red-600 text-slate-100 shadow-slate-900">1</div>:null}
           
          </div>
          <div className="flex flex-col">
          <IoIosNotifications
            className="cursor-pointer text-2xl hover:scale-125 hover:text-slate-300 transition-all text-white"
            onClick={() => {
              setNotification(0);
              router.push("/connection");
            }}
          />
          {notification>0?<div className="absolute shadow w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 
          bg-red-600 text-slate-100 shadow-slate-900">{notification}</div>:null}
          </div>
          <IoChatbubbleEllipsesOutline
            className="cursor-pointer text-2xl hover:scale-125 hover:text-slate-300 transition-all text-white "
            onClick={() => {
              router.push("/connection");
            }}
          />
        </div>
      ) : (
        <div className="flex space-x-3 items-center justify-center">
          <LoginLink className="bg-orange-500 text-white rounded-full py-2 px-4 focus:outline-none">
            Sign Up
          </LoginLink>
          <BsThreeDots className="cursor-pointer" />
        </div>
      )}
    </>
  );
};

export default Navicons;
