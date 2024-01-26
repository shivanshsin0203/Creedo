import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";const {getUser} = getKindeServerSession();
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
   let user:any; 
async function getuser() {
 user =  await getUser();
console.log(user);
    }
    getuser();
const page = () => {
  return (
    <>
    <LogoutLink className=" h-[48px] w-[120px] bg-blue-600 text-white">Log out</LogoutLink>
    <div>{user.given_name}</div>
    </>
  )
}

export default page