"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LuArrowBigUp } from "react-icons/lu";
import { FaCommentAlt, FaShare } from "react-icons/fa";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { io } from "socket.io-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";

const SinglePost = ({ post }: any) => {
  const route = useRouter();
  const { user, isAuthenticated } = useKindeBrowserClient();
  const [comment, setComment] = useState<String>("");
  const [comments, setComments] = useState<any>([]);
  const [socket, setSocket] = useState<any>(null);
  const handleUserClick = async (comment: any) => {
    const result = await axios.post("http://localhost:3005/finduser", {
      email: comment.creator,
    });

    const userId = result.data.result[0]._id;
    route.push(`profilepage/${userId}`);
  };

  const updateLike = async () => {
    // update like logic here
  };

  const handlePostClick = async () => {
    // handle post click logic here
  };
  const handleComment = async () => {
    if (isAuthenticated) {
      const result = axios.post("http://localhost:3005/addcomment", {
        postid: post._id,
        comment: comment,
        creator: user?.email,
        profilepic: user?.picture,
      });
      const newComment = {
        comment: comment,
        creator: user?.email,
      };
      setComments((prev: any) => [...prev, newComment]);
      setComment("");
      socket.emit("comment", { creator: post?.creator });
    } else {
      route.push("/api/auth/login");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const result = await axios.post("http://localhost:3005/getcomments", {
        postid: post._id,
      });

      setComments(result.data.result);
    }
    fetchData();
  }, []);
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
    <div className="w-full h-auto bg-black p-3">
      <div className=" md:w-[72%] lg:w-[72%] w-full h-auto bg-[#1A1A1B] md:ml-[58px]  lg:ml-[58px] ml-0 mb-3 flex space-x-4">
        <div className="flex flex-col items-center p-1">
          <LuArrowBigUp
            className="text-3xl text-slate-500 font-light hover:text-red-500 hover:scale-105 hover:transition-all"
            onClick={updateLike}
          />
          <span className="text-white text-lg font-medium">{post.likes}</span>
        </div>
        <div className="flex flex-col p-2 space-y-3">
          <div className="flex space-x-3">
            <Avatar className="w-4 h-4">
              <AvatarImage src={post?.profilepic || ""} />
              <AvatarFallback>{post?.creator?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span
              className="text-xs text-slate-300 font-semibold hover:underline cursor-pointer"
              onClick={() => handleUserClick}
            >
              {post.creator}
            </span>
          </div>
          <div className="text-slate-200 font-medium text-xl">{post.title}</div>

          <div>
            <div>
              <p className="text-slate-200 font-normal text-lg">{`${post.discription}`}</p>
            </div>
            <Carousel className="w-[80%] mt-2 mb-6">
              <CarouselContent className="w-full h-[20%]">
                {post.image.map((image: any, index: any) => (
                  <CarouselItem key={index}>
                    <Image
                      src={image}
                      alt="Image"
                      width={700}
                      height={300}
                      className="object-contain"
                    ></Image>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
      <div className="  ">
        <div className=" ml-[58px] w-[72%] p-3 text-xs text-slate-300 bg-[#1A1A1B]">{`Comment as ${user?.email}`}</div>
        <textarea
          className="ml-[58px] w-[72%] h-[98px] bg-[#1A1A1B] border border-slate-600 text-slate-300 p-2 overflow-y-hidden overflow-x-hidden"
          placeholder="Write a comment.."
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></textarea>
        <Button
          variant={"secondary"}
          className=" ml-[65%] "
          onClick={handleComment}
        >
          Comment
        </Button>
      </div>
      <div className=" border border-slate-600 w-[80%] ml-[5%] mb-4 mt-2"></div>
      <div className=" ml-[58px] w-[72%]  text-slate-300 bg-[#1A1A1B] ">
        {comments.length > 0 ? (
          comments.map((comment: any, index: any) => (
            <div key={index} className=" flex flex-col space-y-1 mb-7 p-3">
              <div className=" flex space-x-3">
                <Avatar className="w-4 h-4">
                  <AvatarImage src={comment?.profilepic || ""} />
                  <AvatarFallback>{comment?.creator?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-slate-300 font-semibold hover:underline cursor-pointer">
                  {comment.creator}
                </span>
              </div>
              <div>
                <p className="text-slate-200 font-normal text-lg ml-[38px]">{`${comment.comment}`}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-slate-300">No Comments</div>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
