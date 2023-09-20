import React, { useContext } from "react";
import { usePost } from "@/context/postProvider";

const Child3 = ({}) => {
  const { title, myFunc } = usePost();

  return <div onClick={myFunc}>{title} </div>;
};

export default Child3;
