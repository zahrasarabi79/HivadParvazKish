import React, { FC, ReactNode } from "react";
import Sidebar from "./dashboard/SideBar";

export interface ChildrenType {
  children: ReactNode;
}

const layout: FC<ChildrenType> = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sidebar>
      <div>lorem</div>
    </Sidebar>
  );
};

export default layout;
