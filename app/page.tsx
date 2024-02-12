import RightBar from "@/components/RightBar";
import { Button } from "@/components/ui/button";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import Feeds from "@/components/Feeds";
const Home = () => {
  
  return (
    <>
    <div className=" w-screen h-screen flex bg-black">
    <div className=" md:w-[70%] lg:w-[70%] h-screen bg-black w-screen ml-0  ">
      <Feeds/>
    </div>
    <div className=" md:w-[25%] lg:w-[25%] w-0 h-screen bg-black fixed right-0 top-[49px] hidden md:block lg:block ">
     <RightBar/>
    </div>
    </div>
    </>
  )
}

export default Home