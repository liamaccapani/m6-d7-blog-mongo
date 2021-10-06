import express from "express";
import createHttpError from "http-errors";
import PostModel from "./schemaAndModel.js";
import CommentModel from "../comments/schemaAndModel.js";

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



// ************* COMMENTS ************* \\
router.get("/:postId/comments", async(req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.postId);
    if (post) {
      res.send(post.comments);
    } else {
      next(createHttpError(404, `Post with id ${req.params.postId} not found!`));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
})

router.post("/:postId/comments", async(req, res, next) => {
 try {
   const post = await PostModel.findById(req.params.postId)
   if(post){
    const newComment = await new CommentModel(req.body).save();
    // console.log(newComment)
    const newCommentInfo = {
      ...newComment.toObject(),
      commentedAt: new Date()
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      req.params.postId,
      {$push: {comments: newCommentInfo}},
      {new: true}
    )
    res.status(201).send(updatedPost)

   } else {
    next(createHttpError(404, `Post with id ${req.params.postId} not found!`));
   }
 } catch (error) {
  console.log(error)
  next(error)
 }
})

router.get("/:postId/comments/:commentId", async(req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.postId);
    if (post) {
      const comment = post.comments.find( comment => comment._id.toString() === req.params.commentId)

      if (comment){
        res.send(comment)
      } else {
        res.send(createHttpError(404, `Comment with id ${req.params.commentId} not found!`))
      }

    } else {
      next(createHttpError(404, `Post with id ${req.params.postId} not found!`));
    }

  } catch (error) {
    console.log(error)
    next(error)
  }
})


router.put("/:postId/comments/:commentId", async(req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.postId)
    if(post){
      const commentIndex = post.comments.findIndex(comment => comment._id.toString() === req.params.commentId)

      if(commentIndex !== -1){
        post.comments[commentIndex] = {...post.comments[commentIndex].toObject(), ...req.body}
        await post.save()
        res.send(post)

      } else {
        next(createHttpError(404, `Comment with id ${req.params.commentId} not found!`))
      }
    }

  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.delete("/:postId/comments/:commentId", async(req, res, next) => {
  try {
    const post = await PostModel.findByIdAndUpdate(
      req.params.postId,
      {$pull: {comments: {_id: req.params.commentId}}},
      {new: true}
      )

    if(post){
      res.send(post)

    } else {
      next(createHttpError(404, `Post with id ${req.params.postId} not found!`));
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})





export default router;
