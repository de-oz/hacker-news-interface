import React from "react";
import { Link } from "react-router-dom";

const NewsItem = ({ item: { id, title, by, score, time } }) => {

  return (
    <div className="item">
      <h3 className="item__title">
        <Link to={`/${id}`}>{title}</Link>
      </h3>

      <div className="item__details">
        <span> author: {by}; </span>
        <span> score: {score}; </span>
        <span>{new Date(time * 1000).toLocaleString("ru-RU")}</span>
      </div>
    </div>
  );
};

export default NewsItem;
