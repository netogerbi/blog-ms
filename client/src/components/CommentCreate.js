import React, { useState } from "react";
import api from "../apis/api";

const CommentCreate = ({ postId }) => {
  const [comment, setComment] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await api.post(`/posts/${postId}/comments`, { comment });
  };

  return (
    <div className="">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            type="text"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
