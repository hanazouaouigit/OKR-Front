import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CommentBox from "./CommentBox";
import MediaList from "./MediaList";
import DisplayDate from "../DisplayDate/index";
import Card from "@material-ui/core/Card";
import { Button, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap";
import * as Icons from "react-feather";
import { PHOTO_URL } from "api/constant";
import { useMutationPost } from "DemoPages/Wall/post.hooks";
import Token from "util/Token";
import { usePostContext } from "DemoPages/Wall/context/PostContext";
import withConfirmation from "DemoPages/Wall/components/withConfirmation";
import EditPost from "./EditPost"
const PostItem = (props) => {
  const [message, setMessage] = useState("");
  const [isLike, setIsLike] = React.useState(false);
  const {addComment,addLike,deletePost} =useMutationPost();
  const {selectedProject,myRole} =usePostContext();
  const [modalDelete,setModalDelete] =React.useState(false);
  const [modalEdit,setModalEdit] =React.useState(false);
  function deleteMyPost(){
    alert("fff")
    deletePost(props?.post?.id,selectedProject).then(()=>{

    })
    
  }

  const _handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addComment({
        input:{
          post:props?.post?.id,
          body:message
        },
        project:selectedProject
      });
      setMessage('');
      
    }
  };

  const updateCommentValue = (evt) => {
    setMessage(evt.target.value);
  };

  // const handleLikeToggle = () => {
  //   setPost({
  //     ...post,
  //     isLike: !post.isLike,
  //     likeCount: (post.isLike === true ? post.likeCount - 1 : post.likeCount + 1)
  //   });
  // };
  const handleLike=()=>{
    addLike(props?.post?.id,selectedProject)
  }
   const isLiked=()=>{
     return true;
    return props?.post?.likes?.some(l=>{
      
      return String(l) ===String(Token.getUserWallId())
    })
   }
  const {
    createdBy: user,
    createdAt,
    likes,
    media,
    comments,
    body,
    isMyPost
  } = props.post;
  return (
    <React.Fragment>
      <Modal isOpen={modalDelete} onClosed={()=>setModalDelete(false)}>
        <ModalBody>
          <Label className="h5"> Delete this post ? </Label>
        </ModalBody>
        <ModalFooter>
          <Button onClick={()=>setModalDelete(false)}>Cancel</Button>
          <Button color="danger" onClick={deleteMyPost}>Delete</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalEdit} onClosed={()=>setModalDelete(false)}>
        <ModalBody>
        <EditPost {...props.post} close={()=>setModalEdit(false)} />
                </ModalBody>
      </Modal>
      <Card className="jr-card">
      <div className="jr-wall-content">
        <div className="media jr-wall-user-info flex-nowrap align-items-center">
          <Avatar className="mr-3 mb-2 size-50" src={user?.photoUrl} />
          <div className="media-body">
            <h5 className="jr-wall-user-title">{user?.fullName}</h5>
            <DisplayDate date={createdAt} />
          </div>

         
         {(isMyPost ===true) && <Button color="white">
            <Icons.Edit size={15} color="gray" onClick={()=>setModalEdit(true)} />
          </Button>}
          {(myRole ==="MANAGER" || isMyPost ===true)&& <Button color="white">
            <Icons.Trash size={15} color="gray" onClick={()=>setModalDelete(!modalDelete)}/>
          </Button>}
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: body,
          }}
        ></div>

        {media && media?.length > 10 && (
          <div className="d-flex justify-content-center align-items-center">
            <img
              src={PHOTO_URL + media}
              style={{ height: "150px", width: "150px" }}
            />
          </div>
        )}

        <div className="d-flex flex-row mb-2 mb-xl-3">
          <p className="jr-fs-sm pointer mr-3 text-grey">
            <i className="zmdi zmdi-eye jr-fs-lg mr-2 d-inline-flex vertical-align-middle" />
            {/* <span
              className="d-inline-flex align-middle">{viewCount > 0 ? viewCount + ' Views' : 'Views'}</span> */}
          </p>
         
          <p className="jr-fs-sm pointer mr-3 text-grey">
            <i className="zmdi zmdi-comment-more jr-fs-lg mr-2 d-inline-flex align-middle" />
            <span className="d-inline-flex align-middle">
              {comments?.length > 0 ? comments.length + " Comments" : "Comments"}
            </span>
          </p>
        </div>

        <div className="jr-wall-comment-box">
          {comments?.map((commentData, index) => (
            <CommentBox key={index} index={index} commentData={commentData} />
          ))}
        </div>
        <div className="jr-wall-comment-box">
        { myRole !=="OBSERVER" &&
          <div className="media mb-2">
            <Avatar className="mr-3 size-36" src={user?.photoUrl} />
            <div className="media-body">
           <Input
                type="textarea"
                id="required"
                className="border-0"
                onChange={(event) => updateCommentValue(event)}
                onKeyPress={(event) => _handleKeyPress(event)}
                value={message}
                placeholder="Type Comments"
              />
            </div>
          </div>}
        </div>
      </div>
    </Card>
    </React.Fragment>
  );
};

export default withConfirmation(PostItem);
