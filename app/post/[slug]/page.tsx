"use client";
import HomeSkeleton from "@/components/HomeSkeleton";
import RightBar from "@/components/RightBar";
import SinglePost from "@/components/SinglePost";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Page({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.post("http://localhost:3005/getpostbyid", {
        id: params.slug,
      });
      const posts = result.data.result;
      setPost(posts);
      console.log(result);
    }
    fetchData();
  }, []);
  if (post.length === 0) {
    return (
      <div className="w-screen h-screen flex bg-black">
        <HomeSkeleton />
      </div>
    );
  }
  return (
    <div className=" w-screen h-screen flex bg-black">
      <div className=" md:w-[70%] lg:w-[70%] h-screen bg-black w-screen ">
        <SinglePost post={post} />
      </div>
      <div className=" w-[25%] h-screen bg-black fixed right-0 top-[49px] hidden md:block lg:block">
        <RightBar />
      </div>
    </div>
  );
}
