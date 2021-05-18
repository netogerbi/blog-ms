import React, { useState, useEffect } from "react";
import api from "../apis/api";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchData = async () => {
    const { data } = await api.get("/posts");

    console.log(data);

    setPosts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderedPosts = Object.values(posts).map((e) => {
    return (
      <div
        style={{ width: "30%", marginBottom: "20px" }}
        key={e.id}
        className="card"
      >
        <div className="card-body">
          <h3>{e.title}</h3>
          <CommentList comments={e.comments} />
          <CommentCreate postId={e.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
