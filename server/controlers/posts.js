import { postMessage } from "../modals/postMessage.js";
import mongoose from "mongoose";
export const getPosts = async function (req, res) {
  try {
    const postMessages = await postMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async function (req, res) {
  try {
    const post = req.body;
    const newPost = new postMessage({
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send("no post with this id");
    }
    const updatedPost = await postMessage.findOneAndUpdate({ id }, post, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    console.log("error in update post " + error.message);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send("no post with this id");
    }
    console.log(id);
    await postMessage.findById(id).remove();
  } catch (error) {
    console.log(error.message);
  }
};
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated User" });

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("This id doesnt belong to any story");
    }

    const post = await postMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      // if user has not liked the story
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedStory = await postMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.json(updatedStory);
  } catch (error) {
    console.log(error.message);
  }
};
