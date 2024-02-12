"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"

const AddFriend = () => {
    const [email,setEmail] = useState('');
    const [result,setResult] = useState('');
    async function addFriend(){
        const result=axios.post('https://creedo.onrender.com/addfriend',{email:email})
    }
  return (
     (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Friend</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Friend</DialogTitle>
              <DialogDescription>
                Write Email Id to send request. Click Send when youre done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email ID
                </Label>
                <Input id="name" placeholder="example@add.com" className="col-span-3"onChange={(e)=>{setEmail(e.target.value)}}/>
              </div>
              
            </div>
            <DialogFooter>
              <Button  onClick={addFriend}>Send Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
  )
}

export default AddFriend