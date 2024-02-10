"use client"
import axios from "axios"
import {useTypewriter,Cursor,Typewriter} from "react-simple-typewriter"
const page =  () => {

  return (
    <div className=" h-screen w-screen bg-black">
      <div>
        <span className=" flex text-slate-200 text-center text-4xl font-semibold justify-center items-center mt-[20%]">
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
    </div>
  )
}

export default page