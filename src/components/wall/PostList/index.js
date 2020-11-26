import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import WriteBox from "../../../components/wall/WriteBox/index";
import { useQueryPosts } from "DemoPages/Wall/post.hooks";
import { usePostContext } from "DemoPages/Wall/context/PostContext";

const PostList = (props) => {
 
  const [user, setUser] = useState(props.user);

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);
  const { data ,myRole,selectedProject} = usePostContext();
  console.log({myRole});
  
  return (
    <>
      {selectedProject && myRole!=="OBSERVER" && <WriteBox user={user} />}
      
      {data?.map((post) => {
        return (
          <PostItem
            key={post.id}
            index={post.id}
            post={post}
            user={post?.createdBy}
          />
        );
      })}
    </>
  );
};

export default PostList;
