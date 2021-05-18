import React from "react";

const CommentList = ({ comments }) => {
  const renderedComments = (comments || []).map((e) => {
    let content;

    if (e.status === "approved") content = e.comment;
    if (e.status === "pending") content = "Awaiting moderation!";
    if (e.status === "rejected") content = "Comment rejected!";

    return <li key={e.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
