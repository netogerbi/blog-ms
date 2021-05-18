const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id]);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { comment } = req.body;
  const { id: postId } = req.params;
  const status = "pending";

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id, comment, status });

  commentsByPostId[req.params.id] = comments;

  const event = {
    type: "CommentCreated",
    data: { id, comment, postId, status },
  };

  await axios.post("http://event-bus-srv:4005/events", event);

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("RECEIVED EVENT: ", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status } = data;
    const comments = commentsByPostId[postId];
    const c = comments.find((comment) => comment.id === id);
    c.status = status;

    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        comment: c.comment,
        status,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on port 4001");
});
