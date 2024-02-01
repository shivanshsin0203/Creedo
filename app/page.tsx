"use client"
import { Button } from "@/components/ui/button";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Home = () => {
  const route=useRouter();
  return (
    <>
    <div className=" w-screen h-screen flex ">
    <div className=" w-[70%] h-screen bg-orange-400"></div>
    <div className=" w-[30%] h-screen bg-green-400 ">
      <div className=" h-[41%] w-[80%] rounded-lg bg-black mt-4 ml-6 ">
         <Button variant={'default'} onClick={()=>{route.push('/createpost')}}> Create post</Button>
         <Button variant={'secondary'}> Create Community</Button>
      </div>
    </div>
    </div>
    </>
  )
}

export default Home