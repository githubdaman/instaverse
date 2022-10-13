// import react from "react";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "./actions/posts.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
