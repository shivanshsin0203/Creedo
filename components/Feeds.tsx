"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { LuArrowBigUp } from "react-icons/lu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaCommentAlt, FaShare } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
const Feed = () => {
  const [posts, setPosts] = useState([]); // Use any type for posts
  const [first, setFirst] = useState(true);
  let length = posts.length;
  useEffect(() => {
    async function fetchData() {
      const result = await axios.post("http://localhost:3005/posts", {
        posts: 0,
      });

      setPosts(result.data.data);
      console.log(result.data.data + " First time");

      length = result.data.data.length;
      console.log(length + " length");
    }
    fetchData();
  }, [first]);
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      nextPosts();
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  async function nextPosts() {
    console.log("nextPosts");
    console.log(posts.length + "p length");
    const result = await axios.post("http://localhost:3005/posts", {
      posts: length,
    });

    if (Array.isArray(result.data.data) && result.data.data.length > 0) {
      setPosts((prev) => [...prev, ...result.data.data]);
      length = length + result.data.data.length;
      console.log(length + " length");
    } else {
      return;
    }
    console.log(result.data.data);
    console.log(posts);
  }
  return (
    <>
      <div className=" w-full h-full bg-black  ">
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <div key={post.id} className=" w-[100%] h-screen bg-black mb-0 p-3">
              <div
                key={post.id}
                className=" w-[72%] h-[90%] bg-[#1A1A1B] ml-[58px] flex space-x-4"
              >
                <div className=" flex flex-col items-center p-1">
                  <LuArrowBigUp className=" text-3xl text-slate-500 font-light hover:text-red-500 hover:scale-105 hover:transition-all " />
                  <span className=" text-white text-lg font-medium ">
                    {post.likes}
                  </span>
                </div>
                <div className=" flex flex-col p-2 space-y-3">
                  <div className=" flex space-x-3">
                    <Avatar className=" w-4 h-4">
                      <AvatarImage src={post?.profilepic || ""} />
                      <AvatarFallback>
                        {post?.creator?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className=" text-xs text-slate-300 font-semibold hover:underline cursor-pointer">
                      {post.creator}
                    </span>
                  </div>
                  <div className=" text-slate-200 font-medium text-lg">
                    {post.title}
                  </div>
                  {post.image.length > 0 ? (
                    <div>
                      <Carousel className=" w-[80%] ">
                        <CarouselContent className=" w-full h-[20%]">
                          {post.image.map((image: any, index: any) => (
                            <CarouselItem key={index}>
                              <Image
                                src={image}
                                alt="Image"
                                width={700}
                                height={300}
                               className=" object-contain "></Image>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </div>
                  ) : (
                    <div> </div>
                  )}
                  <div className=" flex space-x-3 justify-start items-center mb-0 cursor-pointer">
                    <div>
                      <div className=" flex space-x-1 justify-center items-center">
                      <FaCommentAlt className=" text-lg text-slate-500 font-light hover:text-red-500 hover:scale-105 hover:transition-all " />
                      <span className=" text-slate-400 text-xs font-medium ">
                        comments
                      </span>
                      </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className=" text-white">Loading...</div>
        )}
      </div>
    </>
  );
};
export default Feed;
