import Col from "react-bootstrap/Col";
import Post from "./Post/Post.js";
import { useSelector } from "react-redux";

const Posts = () => {
  const posts = useSelector((state) => state.posts);
  return (
    <>
      {posts.map((post) => (
        <Col key={post._id} lg={6} md={6} sm={12} xs={12}>
          <Post post={post} />
        </Col>
      ))}
    </>
  );
};

export default Posts;
