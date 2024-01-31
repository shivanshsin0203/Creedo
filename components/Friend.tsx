"use client";
import { use, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { io } from "socket.io-client";
import axios from "axios";

const AddFriend = () => {
  const [email, setEmail] = useState<string>("");
  const [results, setResult] = useState<any>(false);
  const [message, setMessage] = useState<any>("");
  const [socket, setSocket] = useState<any>(null);
  const { user } = useKindeBrowserClient();
  const from = user?.email;
  const username = user?.given_name;
  const userPic = user?.picture;
  async function addFriend() {
    try {
      const resultReceived = await axios.post(
        "http://localhost:3005/addfriend",
        { to: email, from: from,name:username,picture:userPic },
      );

      setResult(resultReceived.data.result);
      setMessage(resultReceived.data.message);
      console.log(resultReceived.data);
      if (resultReceived.data.result) {
        console.log(socket);
        socket.emit("friend_request", { to: email });
      }
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  }
  useEffect(() => {
    const newSocket = io("http://localhost:3001", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    });

    newSocket.on("connect", () => {
      console.log("connected");
    });

    setSocket(newSocket);
  }, [user]);
  return (
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
            <Label htmlFor="name" className="text-right">
              Email ID
            </Label>
            <Input
              id="name"
              placeholder="example@add.com"
              className="col-span-3"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          {results ? (
            <div className="text-green-500">{message}</div>
          ) : (
            <div className="text-red-500">{message}</div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={addFriend}>Send Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriend;
