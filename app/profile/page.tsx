import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
const { getUser } = getKindeServerSession();
const {isAuthenticated}=getKindeServerSession();
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { redirect } from "next/navigation";

const page = async() => {
  let user: any;
  
    user = await getUser();
    const loggedIn=await isAuthenticated();
    console.log(user);
    if(!loggedIn){
      redirect("/api/auth/login");
    }
  return (
    <>
      <h1 className=" mt-18">User profile page</h1>
      <LogoutLink className=" h-[48px] w-[120px] bg-blue-600 text-white">
        Log out
      </LogoutLink>
      
    </>
  );
};

export default page;
