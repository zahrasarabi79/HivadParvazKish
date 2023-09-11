import React, { FC, ReactNode } from "react";
import Sidebar from "./SideBar";

export interface ChildrenType {
  children: ReactNode;
}

const layout: FC<ChildrenType> = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sidebar>
      {children}
    </Sidebar>
  );
};

export default layout;
