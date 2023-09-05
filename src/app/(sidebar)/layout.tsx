import React, { FC, ReactNode } from "react";
import SideBar from "./dashboard/SideBar";

export interface ChildrenType {
  children: ReactNode;
}

const layout: FC<ChildrenType> = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;
