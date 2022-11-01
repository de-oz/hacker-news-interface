import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Comment from "./Comment";
import getItem from "./getItem";

function NewsPage({ match }) {
  const [item, setItem] = useState({});
  const [comments, setComments] = useState([]);
  const history = useHistory();

  async function getComments(kids) {
    try {
      const comments = await Promise.all(kids.map(getItem));

      return comments;
    } catch (error) {
      console.log("Failed to get the comments: " + error.message);
    }
  }

  useEffect(() => {
    getItem(match.params.id)
      .then((item) => {
        setItem(item);
        return item.kids;
      })
      .then((kids) => {
        getComments(kids)
          .then((comments) => {
            setComments(comments);
          })
          .catch((error) => {
            console.log("Failed to get the comments" + error.message);
          });
      })
      .catch((error) => {
        console.log("Failed to update the item state: " + error.message);
      });
  }, []);

  return (
    <>
      <button type="button" onClick={() => history.push("/")}>
        Back to Main Page
      </button>
      <h1>{item.title} <a href={item.url || `https://news.ycombinator.com/item?id=${item.id}`} target="_blank" rel="noreferrer">(url)</a></h1>
      <div>Date: {new Date(item.time * 1000).toLocaleString("ru-RU")}</div>
      <div>Author: {item.by}</div>
      <div className="item__comments">Comments: {item.descendants}</div>
      <ul>
        {comments?.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </ul>
    </>
  );
}

export default NewsPage;
