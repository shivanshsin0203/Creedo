"use client"
import Image from "next/image";
import { Button } from "./ui/button"
import { useRouter } from "next/navigation";
const RightBar = () => {
    const route = useRouter();
  return (
    <>
     <div className=" h-[49%] w-[80%] rounded-xl bg-slate-800 mt-4 ml-6 ">
         <div className=" w-full">
            <Image src={'https://www.redditstatic.com/desktop2x/img/id-cards/home-banner@2x.png'} alt="Image" width={500} height={500}></Image>
         </div>
         <div className=" w-full pl-3 flex  items-center space-x-3">
            <Image src={'https://www.redditstatic.com/desktop2x/img/id-cards/snoo-home@2x.png'} alt="Image" width={50} height={58}/>
            <span className=" text-white font-medium text-lg i">Home</span>
         </div>
         <div className=" border-t-[1.25px]"></div>
         <div className=" flex  flex-wrap p-3 text-white">
         Your personal Creedo frontpage. Come here to create new post for others to watch.
         </div>
         <div className=" border-t-[1.25px]"></div>
          <div className=" flex flex-col space-y-3 justify-center items-center mt-3 ">
         <Button variant={'secondary'} className=" w-[80%] cursor-pointer" onClick={()=>{route.push('/createpost')}}> Create post</Button>
         <Button variant={'secondary'} className=" w-[80%] cursor-not-allowed"> Create Community</Button>
         </div>
      </div>
    </>
  )
}

export default RightBar