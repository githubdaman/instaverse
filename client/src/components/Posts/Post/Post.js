import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { BsHeart, BsTrash, BsPencil } from "react-icons/bs";
import moment from "moment";
import { updateCurrentId } from "../../../actions/update-current-id.js";
import { useDispatch } from "react-redux";
import { deletePost, likePost, getPosts } from "../../../actions/posts.js";
const Post = ({ post }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title> {post.name}</Card.Title>

        {user?.result?._id === post.creator && (
          <Button
            variant="light"
            className="float-end"
            onClick={() => dispatch(updateCurrentId(post._id))}
          >
            <BsPencil />
          </Button>
        )}

        <div className="text-muted small">
          <Card.Subtitle> {moment(post.createdAt).fromNow()} </Card.Subtitle>
        </div>
        <Card.Text>{post.message}</Card.Text>
        <Card.Text> {post.tags} </Card.Text>
        <Card.Img variant="bottom" src={post.selectedFile} />
      </Card.Body>
      <Card.Footer>
        <Button
          variant="light"
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <BsHeart />
        </Button>
        {post.likes.length}

        {user?.result?._id === post.creator && (
          <Button
            variant="light"
            className="float-end"
            onClick={() => {
              dispatch(deletePost(post._id));
              dispatch(getPosts());
            }}
          >
            <BsTrash /> Delete
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default Post;
