const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

const handleEvents = (type, data) => {
  console.log("RECEIVED EVENT: ", type);

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, comment, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, comment, status });
  }

  if (type === "CommentUpdated") {
    const { id, comment, postId, status } = data;
    const post = posts[postId];
    const c = post.comments.find((e) => e.id === id);
    c.status = status;
    c.comment = comment;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvents(type, data);
  res.send({});
});

app.listen(4002, async () => {
  console.log("Lintening on port 4002");
  const r = await axios.get("http://event-bus-srv:4005/events");

  for (let event of r.data) {
    handleEvents(event.type, event.data);
  }
});
