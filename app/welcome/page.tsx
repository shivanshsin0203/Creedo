"use client"
import { Button } from "@/components/ui/button"
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import axios from "axios"
import {useTypewriter,Cursor,Typewriter} from "react-simple-typewriter"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const Page =  () => {
  const route = useRouter();
  const {user}=useKindeBrowserClient();
  useEffect(() => {
    async function adddata(){
    const result= await axios.post('https://1wkig1twra.execute-api.ap-south-1.amazonaws.com/register',user)
    console.log(result);
    }
    adddata();
  },[user])
  return (
    <div className=" h-screen w-screen bg-black flex flex-col">
      <div>
        <span className=" flex text-gray-300 text-center text-4xl font-semibold justify-center items-center mt-[20%]">
        <Typewriter
                words={["Welcome to the platform Creedo "," Create like connect and have fun"]}
                loop={5000}
                cursor
                cursorStyle='_'
                typeSpeed={80}
                deleteSpeed={60}
                delaySpeed={10}
                
              />
              <span className=" text-red-400">
              <Cursor />
              </span>
             
        </span>
      </div>
      <div className=" flex items-center justify-center mt-10 p-3">
        <span className= " text-slate-300">A Web Platform to creat post make friends and amazing chill zone</span>
      </div>
      <div className=" flex justify-center mt-10 ">
        <Button variant={'secondary'} onClick={()=>{route.replace('/')}}>Get Started</Button>
      </div>
    </div>
  )
}

export default Page