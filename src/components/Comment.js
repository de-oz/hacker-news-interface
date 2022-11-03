import React, { useState, useEffect } from "react";
import CommentsTree from "./CommentsTree";

function Comment({ comment: { by, kids, text, time } }) {
  const [isExpanded, setExpanded] = useState();
  const hasNestedComments = Array.isArray(kids) && kids.length;

  useEffect(() => {
    setExpanded(false);
  }, []);

  return (
    <li className="comment">
      <span>
        by {by}; {new Date(time * 1000).toLocaleString("ru-RU")} minutes ago
      </span>

      <p dangerouslySetInnerHTML={{ __html: text }} />

      {hasNestedComments && (
        <button type="button" onClick={() => setExpanded(!isExpanded)}>
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      )}

      {hasNestedComments && isExpanded && <CommentsTree commentIds={kids} />}
    </li>
  );
}

export default Comment;
