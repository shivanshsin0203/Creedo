import axios from "axios"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

const page = async () => {
 const {getUser}= getKindeServerSession() 
 const user= await getUser()
  const result= await axios.post('http://localhost:3005/register',user)
  console.log(result)
  return (
    <div>page</div>
  )
}

export default page