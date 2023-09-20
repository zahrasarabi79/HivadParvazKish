"use client";
import React from "react";
import { PostProvider } from "@/context/postProvider";
import Child1 from "../Components/test/Child1";

const page = () => {
  return (
    <PostProvider>
      <Child1 />
    </PostProvider>
  );
};

export default page;
