import React from "react";
import { Link } from "react-router-dom";
import "../styles/NewsItem.scss";

const NewsItem = ({ item: { id, title, by, score, time } }) => {
  return (
    <li className="news-item">
      <h3 className="news-item__title">
        <Link to={`/${id}`}>{title}</Link>
      </h3>

      <div className="news-item__details">
        by <span className="accent">{by}</span> | score: {score} | posted: {new Date(time * 1000).toLocaleString("ru-RU")}
      </div>
    </li>
  );
};

export default NewsItem;
