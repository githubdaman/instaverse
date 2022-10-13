import React from "react";
import Posts from "../Posts/Posts.js";
import Container from "react-bootstrap/Container";
import PostForm from "../Forms/PostForm.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Home = () => {
  return (
    <Container>
      <Row className="g-4">
        <Col lg={3} md={3} sm={3}>
          <PostForm />
        </Col>
        <Col>
          <Row className="g-4">
            <Posts />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
