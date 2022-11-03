import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CommentsTree from "./CommentsTree";
import getItem from "./getItem";

function NewsPage({ match }) {
  const itemId = match.params.id;
  const [item, setItem] = useState({});
  const history = useHistory();

  function hasComments(item) {
    return Boolean(item.descendants);
  }

  useEffect(() => {
    getItem(itemId).then((item) => {
      setItem(item);
    });
  }, []);

  return (
    <>
      <button type="button" onClick={() => history.push("/")}>
        Back to Main Page
      </button>

      <h1>
        {item.title}
        <a
          href={item.url || `https://news.ycombinator.com/item?id=${item.id}`}
          target="_blank"
          rel="noreferrer"
        >
          (url)
        </a>
      </h1>

      <div>Date: {new Date(item.time * 1000).toLocaleString("ru-RU")}</div>

      <div>Author: {item.by}</div>

      <h2>Comments: {item.descendants}</h2>
      <button
        type="button"
        onClick={() =>
          getItem(itemId).then((item) => {
            setItem(item);
          })
        }
      >
        Refresh
      </button>

      {hasComments(item) && <CommentsTree commentIds={item.kids} />}
    </>
  );
}

export default NewsPage;
