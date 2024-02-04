import RightBar from "@/components/RightBar";
import { Button } from "@/components/ui/button";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import Feeds from "@/components/Feeds";
const Home = () => {
  
  return (
    <>
    <div className=" w-screen h-screen flex bg-black">
    <div className=" w-[70%] h-screen bg-black ">
      <Feeds/>
    </div>
    <div className=" w-[25%] h-screen bg-black fixed right-0 top-[49px]">
     <RightBar/>
    </div>
    </div>
    </>
  )
}

export default Home