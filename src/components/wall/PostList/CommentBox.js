import React, {useEffect, useState} from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ReactHashtag from "react-hashtag";
import DisplayDate from "../DisplayDate/index";
import {Input, Label, Modal, ModalBody, ModalFooter} from "reactstrap";
import { Edit, Trash } from "react-feather";
import EditComment from "./EditComment";
import { usePostContext } from "DemoPages/Wall/context/PostContext";
import { useMutationPost } from "DemoPages/Wall/post.hooks";
const CommentBox = (props) => {

  const [isComment, setIsComment] = useState(false);

  const [commentData, setCommentData] = useState({
    id: 0,
    user: {},
    isLike: true,
    likeCount: 0,
    date: '',
    commentList: [],
    comment: ''
  });
  const [modalDelete,setModalDelete] =React.useState(false);
  const [modalEdit,setModalEdit] =React.useState(false);
  const {selectedProject,myRole} =usePostContext();
  const {deleteComment} =useMutationPost();
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCommentToggle();
    }
  };

  useEffect(() => {
    setCommentData(props.commentData)
  }, [props.commentData]);


  const handleLikeToggle = () => {
    setCommentData({
      ...commentData,
      isLike: !commentData.isLike,
      likeCount: (commentData.isLike === true ? commentData.likeCount - 1 : commentData.likeCount + 1)
    });
  };

  const handleCommentToggle = () => {
    setIsComment((previousState) => ({
        isComment: !previousState.isComment,
      }
    ));
  };
  function deleteMyComment(){
      deleteComment(props.commentData.id,selectedProject);
      setModalDelete(false);
  }
  function extractHashtag(text){
      const p =text.indexOf("#");
      let ch = text.substring(p+1,text.length);
      return ch;
  }
  function renderBody(body){
    const tab =body.split(" ")?.map(text=> text.indexOf("#") !==-1 ? `<a href="/#/hashtag/${selectedProject}/${extractHashtag(text)}" class="text-danger">${text}</a>` :text).join(" ");
  
    return tab;
  }

  const {createdBy:user, body,likes, createdAt, comment,isMyComment} = props?.commentData;
  return (
    <div className="media flex-nowrap jr-wall-user-info mb-3">
      <Modal isOpen={modalDelete} onClosed={()=>setModalDelete(false)}>
        <ModalBody>
          <Label className="h5"> Delete this comment ? </Label>
        </ModalBody>
        <ModalFooter>
          <Button onClick={()=>setModalDelete(false)}>Cancel</Button>
          <Button color="danger" onClick={deleteMyComment}>Delete</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalEdit} onClosed={()=>setModalDelete(false)}>
        <ModalBody>
        <EditComment {...props.commentData} close={()=>setModalEdit(false)} />
                </ModalBody>
      </Modal>
      <Avatar alt="..." className="mr-3 jr-size-40" src={user?.photoUrl}/>
      <div className="media-body">
        <h5 className="jr-wall-user-title">{user?.fullName}</h5>
        
        <DisplayDate date={createdAt}/>
       
        <div className="mt-2"
          dangerouslySetInnerHTML={{
            __html: renderBody(body),
          }}
        ></div>
        
       
        <div className="flex-row">
        <div className="d-flex ">
          {(isMyComment) && <Button >
            <Edit size={15} color="gray" onClick={()=>setModalEdit(!modalEdit)} />
          </Button>}
          {(myRole =="MANAGER" || isMyComment) && <Button>
            <Trash size={15} color="gray" onClick={()=>setModalDelete(!modalDelete)} />
          </Button>}
        </div>
        </div>
        {isComment === true ? <div className="media mt-3">
          <Avatar className="mr-3 size-30" src={user?.photoUrl}/>
          <div className="media-body">
            <Input
              id="required" className="border-0"
              placeholder="Type Comments"
              onKeyPress={(event) => handleKeyPress(event)}
            />
          </div>
        </div> : null}

      </div>
    </div>
  )
};
export default CommentBox;
