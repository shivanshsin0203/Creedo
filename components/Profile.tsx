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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Profile = ({ user }:any) => {
  const [posts, setPosts] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      if (user) {
        // Ensure user is not empty before making the request
        console.log(user);
        const result = await axios.post("https://creedo.onrender.com/getpostbymail", {
          email: user.email,
        }); // Pass user email to the request
        console.log(result.data.result);
        setPosts(result.data.result);
      }
    }
    fetchData();
  }, [user]);
  async function updateLike(post: any) {
    const newPosts = posts.map((p:any) => {
      if (p._id === post._id) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    });
    setPosts(newPosts);
    await axios.post("https://creedo.onrender.com/updatelike", { id: post._id });
  }

  function handleUserClick(post: any) {}

  function handlePost(post: any) {}

  return (
    <div className="w-full h-full bg-black">
      <div className="flex items-center mb-4 p-4 space-x-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user.profilePic} />
          <AvatarFallback>{user.given_name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="ml-2">
          <p className="text-white font-semibold text-2xl">{user.given_name}</p>
          <p className="text-gray-400 text-xl">{user.email}</p>
        </div>
      </div>

      {posts.map((post: any) => (
        <div key={post.id} className="w-full h-auto bg-black p-3">
          <div
            key={post.id}
            className="md:w-[72%] lg:w-[72%] w-full h-auto bg-[#1A1A1B] md:ml-[58px] lg:ml-[58px] ml-0 flex space-x-4"
          >
            <div className="flex flex-col items-center p-1">
              <LuArrowBigUp
                className="text-3xl text-slate-500 font-light hover:text-red-500 hover:scale-105 hover:transition-all cursor-pointer"
                onClick={() => updateLike(post)}
              />
              <span className="text-white text-lg font-medium">
                {post.likes}
              </span>
            </div>
            <div className="flex flex-col p-2 space-y-3">
              <div className="flex space-x-3 items-center">
                <Avatar className="w-4 h-4">
                  <AvatarImage src={post?.profilepic || ""} />
                  <AvatarFallback>{post?.creator?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span
                  className="text-xs text-slate-300 font-semibold hover:underline cursor-pointer"
                  onClick={() => handleUserClick(post)}
                >
                  {post.creator}
                </span>
              </div>
              <div className="text-slate-200 font-medium text-xl">
                {post.title}
              </div>
              {post.image.length > 0 ? (
                <div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handlePost(post)}
                  >
                    <p className="text-slate-200 font-normal text-lg">{`${post.discription.substring(
                      0,
                      200
                    )} ...`}</p>
                  </div>
                  <Carousel className="w-[80%]">
                    <CarouselContent className="w-full h-[20%]">
                      {post.image.map((image: any, index: any) => (
                        <CarouselItem key={index}>
                          <Image
                            src={image}
                            alt="Image"
                            width={700}
                            height={300}
                            className="object-contain"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              ) : (
                <div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handlePost(post)}
                  >
                    <p className="text-slate-200 font-normal text-lg">{`${post.discription.substring(
                      0,
                      300
                    )} ... Read More`}</p>
                  </div>
                </div>
              )}
              <div className="flex space-x-3 justify-start items-center mb-0 cursor-pointer mt-3">
                <div className="flex space-x-1 justify-center items-center">
                  <FaCommentAlt className="text-lg text-slate-500 font-light hover:text-red-500 hover:scale-105 hover:transition-all" />
                  <span className="text-slate-400 text-xs font-medium">
                    comments
                  </span>
                </div>
                <div className="flex space-x-1 justify-center items-center">
                  <FaShare className="text-lg text-slate-500 font-light hover:text-red-500 hover:scale-105 hover:transition-all" />
                  <span className="text-slate-400 text-xs font-medium">
                    share
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
