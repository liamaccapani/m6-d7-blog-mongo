import express from "express";
import createHttpError from "http-errors";
import PostModel from "./schemaAndModel.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await PostModel.find();
    res.send(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newPost = new PostModel(req.body);
    const { _id } = await newPost.save();
    res.status(201).send({ _id });

  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:postId", async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.postId);
    if (post) {
      res.send(post);
    } else {
      next(createHttpError(404, `Post with id ${req.params.postId} not found!`));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const modifiedPost = await PostModel.findByIdAndUpdate(postId, req.body, {
      new: true,
    });

    if (modifiedPost) {
      res.send(modifiedPost);
    } else {
        next(createHttpError(404, `Post with id ${req.params.postId} not found!`))
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const deletedPost = await PostModel.findByIdAndDelete(req.params.postId)

    if (deletedPost) {
      res.status(204).send()
    } else {
        next(createHttpError(404, `Post with id ${req.params.postId} not found!`))
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
