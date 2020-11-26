import React, { useCallback, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Card, Modal, ModalHeader } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { useDropzone } from "react-dropzone";
import Divider from "@material-ui/core/Divider";
import ReactQuill, { Quill } from "react-quill";
import quillEmoji from "quill-emoji";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import { useMutationPost } from "DemoPages/Wall/post.hooks";
import { usePostContext } from "DemoPages/Wall/context/PostContext";
const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;

Quill.register(
  {
    "formats/emoji": EmojiBlot,
    "modules/emoji-shortname": ShortNameEmoji,
    "modules/emoji-toolbar": ToolbarEmoji,
    "modules/emoji-textarea": TextAreaEmoji,
  },
  true
);

const EditPost = (props) => {
  const { updatePost } = useMutationPost();
  const [body, setBody] = React.useState("");
  const [commentText, setCommentText] = useState("");
  const { content, handleChange } = props;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const {selectedProject} =usePostContext();
  React.useEffect(()=>{
        setBody(props.body);

  },[])
  const handleCancel = () => {
    setPreviewVisible(false);
  };
  const onDrop = useCallback((acceptedFiles) => {
    setFileList(acceptedFiles.map((file) => ({url:URL.createObjectURL(file),file})));
  }, []);
  const handleClickImage = () => {
    setIsOpen(!isOpen);
  };
  const handleUpdatePost = () => {
   
    updatePost({
      input: {
        body,
        project:selectedProject,
        media:fileList?.[0]?.file
      },
      id:props?.id,
      project:selectedProject
    }).then(() => {});
   props.close();
  };

  const onChange = (e) => {
    setCommentText(e.target.value);
  };

  const isEnabled = fileList.length === 0 && commentText === "";

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  function renderEditor() {
    const modules = {
      toolbar: [
        [{ font: [] }, { header: [] }],
        ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
        [{ color: [] }, { background: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        [{ align: [] }],
        ["emoji"],
        ["link", "image"],
        ["clean"],
      ],
      "emoji-toolbar": true,
      "emoji-textarea": true,
      "emoji-shortname": true,
    };

    const formats = [
      "font",
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "code-block",
      "color",
      "background",
      "list",
      "indent",
      "align",
      "link",
      "image",
      "clean",
      "emoji",
    ];

    return (
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={handlePostBody}
        value={body}
      />
    );
  }
  function handlePostBody(e) {
    setBody(e);
  }
  return (
    <div className="">
      <div className="media mb-2">
        <div className="media-body">
          {renderEditor()}
        </div>
      </div>

      <div className="jr-clearfix">
        {isOpen === true ? (
          <div className="d-flex flex-row">
         
            <ul className="list-inline mb-3 mr-2">
              {fileList.map((file, index) => (
                <li
                  className="mb-1 mr-0 list-inline-item align-top"
                  key={index}
                >
                  <img alt="..." className="size-60 rounded" src={file?.url} />
                </li>
              ))}
            </ul>
            <div {...getRootProps()}>
              Prendre photo
              <input {...getInputProps()} />
              {isDragActive ? (
                <i className="zmdi zmdi-collection-image" />
              ) : (
                <i className="zmdi zmdi-collection-image" />
              )}
            </div>
          </div>
        ) : null}
        <Divider />

        <Modal isOpen={previewVisible} toggle={handleCancel}>
          <ModalHeader>Slide Show</ModalHeader>
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>

      <div className="d-flex flex-row align-items-center mt-2">
        <div className="pointer" onClick={handleClickImage}>
          <i className="zmdi zmdi-camera mr-2 jr-fs-xl d-inline-flex align-middle" />
          <span className="jr-fs-sm"> Add Photos/Album </span>
        </div>

        <Button
          color="primary"
          size="small"
          className="ml-auto mb-0"
          disabled={body === ""}
          onClick={handleUpdatePost}
        >
          Update
        </Button>
      </div>
      <Button onClick={props.close}>Close</Button>
    </div>
  );
};

export default EditPost;
