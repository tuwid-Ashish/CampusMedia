import Loginform from "@/components/AuthUser/Login";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Home() {
  const status = useSelector((state) => state.Auth.status);

  if (status === false) {
    return (
      <div className="w-full py-8 m-4 text-center container">
        <div className="flex flex-wrap md:flex-row flex-col justify-between p-2">
          <div className="md:w-5/12  mx-auto">
          <h1 className="text-2xl md:text-4xl  font-bold text-start text-gray-500 md:leading-[60px]">
            Welcome to your <br /> <span className="text-green-400 ">
               College Campus community
              </span>
            </h1>
          <div className="w-[350px]">
            <Loginform/>
          </div>
          </div>
          <div className="w-1/2">
            <img src="https://img.freepik.com/free-vector/happy-students-jumping-with-flat-design_23-2147907627.jpg?w=740&t=st=1711745115~exp=1711745715~hmac=b54631c6c0dee3099ad201632afd1de89b2dc9ede3e28333de251ad6889d07df" alt="hero imge" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
export const HomePostLoader = async () => {
  const posts = await Service.getposts([]);
  if (posts) {
    const arr = [].push(posts.documents);

    return arr;
  }
};
