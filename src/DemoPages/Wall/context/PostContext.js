import { Token } from "graphql";
import React from "react";
import { postList } from "../data";
import { useQueryOrganisation, useQueryPosts } from "../post.hooks";
const PostContext = React.createContext();
const PostProvider = (props) => {
  const [data, setData] = React.useState([]);
  const { data: organisations } = useQueryOrganisation();
  const [selectedProject,setSelectedProject] =React.useState(props?.selectedProject);
  const {data:dataPost} = useQueryPosts(selectedProject,props?.tag);
  const [myRole,setMyRole] =React.useState('');
  function addPost(post){
    setData([post,...data])
  }
  function addComment(comment){
    console.log(comment);
  }
  function handleSelectedProject(project){
    console.log({project})
    setSelectedProject(project?.id);
    setMyRole(project?.myRole)
  }
  React.useEffect(() => {

    if(dataPost){
      setData(dataPost);
    }
  }, [dataPost,selectedProject]);
  React.useEffect(()=>{
    console.log({organisations})
      if(organisations?.length){
        let first = organisations?.[0]?.levels?.[0]?.projects?.[0];
        if(first){
          setSelectedProject(first?.id)
          setMyRole(first?.myRole)
        }
      }
  },[organisations])
  React.useEffect(()=>{
     if(!localStorage.getItem("token")){
       props.history.push("/pages/login")
     }
  },[])
  return (
    <PostContext.Provider
      value={{
        data,
        addPost,
        addComment,
        selectedProject,
        handleSelectedProject,
        myRole
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
const usePostContext = () => React.useContext(PostContext);
export { PostContext, PostProvider, usePostContext };
