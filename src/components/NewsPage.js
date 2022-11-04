import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import CommentsTree from "./CommentsTree";
import getItem from "./getItem";
import "../styles/NewsPage.scss";

function NewsPage({ match }) {
  const itemId = Number(match.params.id);
  const news = useSelector((state) => state.news.newsItems);
  const currentItem = news.find((item) => {
    return item.id === itemId;
  });
  const [item, setItem] = useState(Object.assign({}, currentItem));
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
      <button className="back" type="button" onClick={() => history.push("/")}>
        Back to Main Page
      </button>

      <div className="item">
        <h2>
          {item.title}
          <a
            href={item.url || `https://news.ycombinator.com/item?id=${item.id}`}
            target="_blank"
            rel="noreferrer"
          >
            {item?.url && " (" + item?.url?.slice(0, 30) + "...)"}
          </a>
        </h2>
        <div>Author: <span className="accent">{item.by}</span></div>
        <div>Date: {new Date(item.time * 1000).toLocaleString("ru-RU")}</div>
      </div>

      <h3>Comments: {item.descendants}</h3>
      <button
        className="refresh-btn"
        type="button"
        onClick={() =>
          getItem(itemId).then((updatedItem) => {
            setItem(updatedItem);
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
