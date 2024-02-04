"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
const Feed = () => {
  const [posts, setPosts] = useState([]); // Use any type for posts
  const [first, setFirst] = useState(true);
  let length = posts.length;
  useEffect(() => {
    async function fetchData() {
      const result = await axios.post("http://localhost:3005/posts", {
        posts:0,
      });

      setPosts(result.data.data);
      console.log(result.data.data+" First time");
      
      length = result.data.data.length;
      console.log(length+' length');
    }
    fetchData();
  }, [first]); 
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop+1 >= document.documentElement.scrollHeight){
      nextPosts();
    }
    
  };
  useEffect(()=>{
   
   window.addEventListener('scroll',handleScroll)
  },[])
  async function nextPosts() {
    console.log("nextPosts");
    console.log(posts.length+"p length");
    const result = await axios.post("http://localhost:3005/posts", {
      posts:length,
    });
  
    if (Array.isArray(result.data.data) && result.data.data.length > 0) {
      setPosts((prev)=>[...prev,...result.data.data]);
      length=length+result.data.data.length;
      console.log(length+" length");
    } else {
      return;
    }
    console.log(result.data.data);
    console.log(posts); 
  }
  return <>
  <div className=" w-full h-full bg-black  ">
   {posts.length > 0 ? (
    posts.map((post) => (
        <div key={post.id} className=" w-[100%] bg-black mb-0 p-3">
        <div key={post.id} className=" w-[72%] h-[90vh] bg-slate-700 ml-[58px]">
        {post.creator}
      </div>
      </div>
    ))) : (
      <div className=" text-white">Loading...</div>
    )}
    </div>
  </>
};
export default Feed;
  