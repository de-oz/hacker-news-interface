import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import getItem from "./getItem";

function CommentsTree({ commentIds }) {
  const [comments, setComments] = useState([]);

  async function getComments(ids) {
    try {
      const listOfComments = await Promise.all(ids.map(getItem));
      setComments(listOfComments.filter((item) => !item.dead && !item.deleted));
    } catch (error) {
      console.log("Failed to get the comments: " + error.message);
    }
  }

  useEffect(() => {
    getComments(commentIds);
  }, [commentIds.length]);

  return (
    <ul>
      {Boolean(comments.length) &&
        comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
    </ul>
  );
}

export default CommentsTree;
