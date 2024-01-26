import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";const {getUser} = getKindeServerSession();
   let user:any; 
async function getuser() {
 user =  await getUser();
console.log(user);
    }
    getuser();
const page = () => {
  return (
    
    <div>{user.given_name}</div>
  )
}

export default page