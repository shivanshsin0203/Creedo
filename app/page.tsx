import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

const page = () => {
  return (
    <div className=" bg-white w-full h-full flex flex-col items-center justify-center space-y-5">
    <h1 className=" font-extrabold text-xl text-black">Login page b the time</h1>
      
  <LoginLink className=" h-[48px] w-[120px] bg-blue-600 text-white">Sign in</LoginLink>
  <RegisterLink className="h-[48px] w-[120px] bg-blue-600 text-white">Sign up</RegisterLink>
    </div>
  )
}

export default page