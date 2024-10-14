"use client"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import axios from "axios";
import Image from "next/image";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ConnectionSkeleton";
import { useRouter } from "next/navigation";
const Connection = () => {
  const { user } = useKindeBrowserClient();
  const [requests, setRequests] = useState<any>([]);
  const [friends, setFriends] = useState<any>([]);
  const [loading,setLoading]=useState<boolean>(true);
  const router = useRouter();
  async function getPendingRequests() {
    const result = await axios.post("https://1wkig1twra.execute-api.ap-south-1.amazonaws.com/getfriendrequests", { email: user?.email });
    setRequests(result.data.result);
    console.log(result.data.result);
  }
  const formatDate = (dateString:any) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const ISTDate = new Date(dateString).toLocaleString('en-IN');
    return ISTDate;
  };
  
  async function getFriends() {
    const result = await axios.post("https://1wkig1twra.execute-api.ap-south-1.amazonaws.com/getconnections", { email: user?.email });
    console.log(result.data.result);
    setFriends(result.data.result);
    
  }
  function handleAddFreind(event:any,request:any){
   
    const data=requests.filter((item:any)=>item.from!==request.from);
    setRequests(data);
    toast("Friend Request Accepted");
    const responce=axios.post('https://1wkig1twra.execute-api.ap-south-1.amazonaws.com/acceptfriendrequest',{requestid:request._id,user1_email:user?.email,user1_name:user?.given_name,user1_picture:user?.picture,user2_email:request.from,user2_name:request.name,user2_picture:request.picture});
    console.log(responce);
    const add: any = [...friends, {
      freind_email: request.from,
      freind_name: request.name,
      freind_picture: request.picture
    }];
    setFriends(add);
      }
  function handleRejectFreind(event:any,request:any){
  
    const data=requests.filter((item:any)=>item.from!==request.from);
    setRequests(data);
    toast("Friend Request Rejected");
    const response=axios.post('https://1wkig1twra.execute-api.ap-south-1.amazonaws.com/deletefriendrequest',{requestid:request._id})
    console.log(response);
  }
  useEffect(() => {
    setLoading(true);
    getPendingRequests();
    getFriends();
    setLoading(false);
  }, [user]);
  if(loading){
    
    return<>
    <div className=" w-screen h-screen bg-black">
    <LoadingSpinner/>
    </div>
    </> 
    
  }

  return (
    <>
      <div className="w-screen h-screen bg-black">
        <div className="text-2xl font-semibold text-slate-200 p-4">Pending Requests</div>
        {requests.length > 0 ? (
          requests.map((request: any) => (
            <div className="flex flex-col bg-slate-900 p-4 m-4 rounded-xl " key={request.id}>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                <Avatar className=" w-12 h-12 rounded-full">
          <AvatarImage src={request?.picture || ''} />
          <AvatarFallback>{request?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
                  <div className="flex flex-col ml-4">
                    <div className="text-slate-100 font-semibold">{request.name}</div>
                    <div className="text-slate-100 font-thin">{request.from}</div>
                  </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className=" text-sm text-slate-300">
                        {`Sent on ${formatDate(request.createdAt)}`}
                        </div>
                  <div className="flex flex-col">
                    <TiTickOutline className="text-3xl text-black bg-green-500 rounded-full hover:scale-110 hover:transition-all hover:bg-green-900 cursor-pointer" onClick={(event)=>{handleAddFreind(event,request)}} />
                   
                  </div>
                  <div className="flex flex-col">
                    <RxCross2 className="text-3xl text-black bg-red-500 rounded-full hover:scale-110 hover:transition-all hover:bg-red-900 cursor-pointer" onClick={(event)=>{handleRejectFreind(event,request)}} />
                   
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-slate-100 font-thin mt-1 p-4">.....No Pending Requests</div>
        )}
         
         <div className=" text-white font-extrabold  text-2xl mt-3 p-5">
          {`All Connections [${friends.length}]`} 
        </div>
        {friends.length > 0 ? (
          friends.map((freind: any) => (
            <div className="flex flex-col bg-slate-900 p-4 m-4 rounded-xl" key={freind.id}>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                <Avatar className=" w-12 h-12 rounded-full">
          <AvatarImage src={freind?.freind_picture || ''} />
          <AvatarFallback>{freind?.freind_name?.charAt(0)}</AvatarFallback>
        </Avatar>
                  <div className="flex flex-col ml-4">
                    <div className="text-slate-100 font-semibold">{freind.freind_name}</div>
                    <div className="text-slate-100 font-thin">{freind.freind_email}</div>
                  </div>
                </div>
                <div className="flex flex-row space-x-5 mt-[5.6px] hidden md:block lg:block">
                   <Button className=" outline-1 text-blue-300 bg-slate-700 hover:bg-slate-600 hover:scale-105 hover:transition-all" onClick={()=>{router.replace(`/profilepage/${freind.freind_email}`)}}  >View Profile</Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-slate-100 font-thin mt-1 p-4">.....No Connections Yet</div>
        )}
         
      </div>
    </>
  );
};

export default Connection;
