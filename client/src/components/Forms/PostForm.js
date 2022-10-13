import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Filebase from "react-file-base64";
import { FormStyle } from "./style.js";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts.js";
import { updateCurrentId } from "../../actions/update-current-id.js";
import FormLabel from "react-bootstrap/esm/FormLabel.js";
import Modal from "react-bootstrap/Modal";
const PostForm = () => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const currentId = useSelector((state) => state.currentId);
  const user = JSON.parse(localStorage.getItem("profile"));
  const post = useSelector((state) => {
    if (currentId) {
      return state.posts.find((p) => p._id === currentId);
    } else return null;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };

  const clear = () => {
    dispatch(updateCurrentId(null));
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit} style={FormStyle}>
        {!user?.result?.name ? (
          <FormLabel>
            <h3>
              {" "}
              Please Sign in to Like other People Posts and Create your own
            </h3>{" "}
          </FormLabel>
        ) : (
          <>
            <FormLabel>
              <strong> {currentId ? "Editing" : "Creating"} a Post </strong>
            </FormLabel>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={postData.title}
                onChange={(e) => {
                  setPostData({ ...postData, title: e.target.value });
                }}
              />
              <br />
              <Form.Control
                type="text"
                placeholder="Message"
                name="message"
                value={postData.message}
                onChange={(e) => {
                  setPostData({ ...postData, message: e.target.value });
                }}
              />
              <br />
              <Form.Control
                type="text"
                placeholder="Tags"
                name="tags"
                value={postData.tags}
                onChange={(e) => {
                  setPostData({ ...postData, tags: e.target.value.split(",") });
                }}
              />
            </Form.Group>
            <br />
            <Filebase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setPostData({ ...postData, selectedFile: base64 });
              }}
            />
            <br />
            <br />

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" size="sm">
                Submit
              </Button>
              <Button variant="secondary" onClick={clear} size="sm">
                Clear
              </Button>
              <br />
            </div>
          </>
        )}
      </Form>
    </>
  );
};
export default PostForm;
