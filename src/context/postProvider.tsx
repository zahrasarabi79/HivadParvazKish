import { createContext, useState, useContext } from "react";

const postContext = createContext("");

const PostProvider = ({ children }: any) => {
  const [title, setTitle] = useState("i am child componenet 3 ");
  const myFunc = () => {
    setTitle("😊");
  };

  return <postContext.Provider value={{ title, myFunc }}>{children}</postContext.Provider>;
};

export const usePost = () => {
  return useContext(postContext);
};

export { postContext, PostProvider };
