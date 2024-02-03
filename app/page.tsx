import RightBar from "@/components/RightBar";
import { Button } from "@/components/ui/button";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";

const Home = () => {
  
  return (
    <>
    <div className=" w-screen h-screen flex ">
    <div className=" w-[70%] h-screen bg-black"></div>
    <div className=" w-[30%] h-screen bg-black">
     <RightBar/>
    </div>
    </div>
    </>
  )
}

export default Home