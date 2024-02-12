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
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";

import { routeModule } from "next/dist/build/templates/app-page";
import HomeSkeleton from "./HomeSkeleton";
const Feed = () => {
  const [posts, setPosts] = useState([]); // Use any type for posts
  const [first, setFirst] = useState(true);
  const [hasMore,sethasMore]=useState(true)
  const route = useRouter();
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
  
  async function nextPosts() {
   
    console.log("nextPosts");
    console.log(length + "old length");
    const result = await axios.post("http://localhost:3005/posts", {
      posts: length,
    });
    console.log(result.data.data + " Next time");
    if (Array.isArray(result.data.data) && result.data.data.length > 0) {
     
      console.log(posts)
      setPosts((prev) => [...prev, ...result.data.data]);
      console.log(length + " length");
      length = length + 2;
      
    } else {
      sethasMore(false)
    }
    console.log(result.data.data);
    console.log(posts);
   
  }
 function handleUserClick(event:any,post: any) {
    
    route.push(`profilepage/${post.creator}`)
  }
  async function updateLike(post:any) {
    const postIndex = posts.findIndex(postprev => postprev._id === post._id);
    if(postIndex !== -1) {
      const newPosts:any = [...posts];
      newPosts[postIndex].likes += 1;
      setPosts(newPosts);
      const likes_count=newPosts[postIndex].likes;
      const result= await axios.post('http://localhost:3005/updatelike',{id:post._id})

    }
    else{
      console.log("Not found")
    }
  }
  async function handlePost(post:any){
   route.push(`post/${post._id}`)
  }
  return (
    <>
      <div className=" w-full h-full bg-black  ">
        <InfiniteScroll
        dataLength={posts.length}
        next={nextPosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        
        endMessage={
          <p style={{ textAlign: "center" }} className=" bg-black">
              <b className=" bg-black text-slate-400">Yay! You have seen it all</b>
            </p>
        }
        >

        
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <div key={post.id} className=" w-[100%] h-auto  bg-black p-3 ">
              <div
                key={post.id}
                className=" md:w-[72%] lg:w-[72%] w-full h-auto bg-[#1A1A1B] md:ml-[58px] lg:ml-[58px] ml-0 flex space-x-4"
              >
                <div className=" flex flex-col items-center p-1">
                  <LuArrowBigUp className=" text-3xl text-slate-500 font-light hover:text-red-500 hover:scale-105 hover:transition-all " onClick={()=>updateLike(post)} />
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
                    <span className=" text-xs text-slate-300 font-semibold hover:underline cursor-pointer" onClick={(event:any)=>{handleUserClick(event,post)}}>
                      {post.creator}
                    </span>
                  </div>
                  <div className=" text-slate-200 font-medium text-xl">
                    {post.title}
                  </div>

                  {post.image.length > 0 ? (
                    <div>
                      <div className=" cursor-pointer " onClick={()=>{handlePost(post)}}>
                        <p className=" text-slate-200 font-normal text-lg">{`${post.discription.substring(
                          0,
                          200
                        )} ...`}</p>
                      </div>
                      <Carousel className=" w-[80%] ">
                        <CarouselContent className=" w-full h-[20%]">
                          {post.image.map((image: any, index: any) => (
                            <CarouselItem key={index}>
                              <Image
                                src={image}
                                alt="Image"
                                width={700}
                                height={300}
                                className=" object-contain "
                              ></Image>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </div>
                  ) : (
                    <div>
                      
                      <div className=" cursor-pointer " onClick={()=>{handlePost(post)}}>
                        <p className=" text-slate-200 font-normal text-lg">{`${post.discription.substring(0,300)}  ... Read More`}</p>
                      </div>
                    </div>
                  )}
                  <div className=" flex space-x-3 justify-start items-center mb-0 cursor-pointer mt-3">
                    <div className=" flex space-x-1 justify-center items-center">
                      <FaCommentAlt className=" text-lg text-slate-500 font-light hover:text-red-500 hover:scale-105 hover:transition-all " />
                      <span className=" text-slate-400 text-xs font-medium ">
                        comments
                      </span>
                    </div>
                    <div className=" flex space-x-1 justify-center items-center">
                      <FaShare className=" text-lg text-slate-500 font-light hover:text-red-500 hover:scale-105 hover:transition-all " />
                      <span className=" text-slate-400 text-xs font-medium ">
                        share
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          ))
         
        ) : (
          <HomeSkeleton/>
        )}
        </InfiniteScroll>
      </div>
    </>
  );
};
export default Feed;
