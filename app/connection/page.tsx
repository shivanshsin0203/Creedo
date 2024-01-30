"use client"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

const Connection = () => {
    const {user}=useKindeBrowserClient();
    const [requests,setRequests]=useState<any>([]);
    const [friends,setFriends]=useState<any>([]);
    async function getPendingRequests(){
        const result=await axios.post("http://localhost:3005/getfriendrequests",{email:user?.email});
        setRequests(result.data.result);
        console.log(result.data.result);
    }
    async function getFriends(){
        const result=await axios.post("http://localhost:3005/getfriends",{email:user?.email});
        setFriends(result.data.result);
    }
    useEffect(()=>{
        getPendingRequests();
       
    },[user])
  return (
    <>
    <div className=" w-screen h-screen bg-black">
    <div className=" text-2xl font-semibold text-slate-200 p-4">Pending Requests</div>
    {requests.length>0?<div></div>:<div className=" text-slate-100 font-thin mt-1 p-4 ">.....No Pending Requests</div>}
    </div>
    </>
  )
}

export default Connection