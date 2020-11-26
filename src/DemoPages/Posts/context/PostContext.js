import React from "react";
import { posts } from "../data/posts";
import { useQueryPosts } from "../post.hooks";
const PostContext = React.createContext();
const PostProvider = (props) => {
  const [data, setData] = React.useState([posts]);
  const {data:dataPosts} =useQueryPosts();
  
  React.useEffect(() => {
   
  }, []);
  return (
    <PostContext.Provider
      value={{
        data,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
const usePostContext = () => React.useContext(PostContext);
export { PostContext, PostProvider, usePostContext };
