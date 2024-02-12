"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import RightBar from "@/components/RightBar"
import Profile from "@/components/Profile"
import HomeSkeleton from "@/components/HomeSkeleton"
export default function Page({ params }: { params: { slug: string } }) {
  const email = params.slug
  let convertedEmail = email.replace(/%40/g, "@");
  const [user, setUser] = useState<any>([])
     useEffect(() => {
      async function fetchData() {
        console.log(params.slug)

        const result= await axios.post('https://creedo.onrender.com/finduser', {
          email: convertedEmail})
          console.log(result.data.result[0])
          setUser(result.data.result[0]);
          }
          fetchData();
    },[email]);
    return (
      <div className="w-screen h-screen flex bg-black">
        {user.length === 0 ? (
          <div className="w-[80%] h-screen flex bg-black">
            <HomeSkeleton/>
          </div>
        ) : (
          <>
            <div className="md:w-[70%] lg:w-[70%] w-screen h-screen bg-black ">
              <Profile user={user} /> {/* Pass user object to Profile component */}
            </div>
            <div className="w-[25%] h-screen bg-black fixed right-0 top-[49px] hidden md:block lg:block">
              <RightBar />
            </div>
          </>
        )}
      </div>
    )
  }