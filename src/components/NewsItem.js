import React from "react";

const NewsItem = ({ item: { title, by, score, time }}) => {
  return (
    <div className="item">
      <h2 className="item__title">{title}</h2>

      <div className="item__details">
        <span> author: {by}; </span>
        <span> score: {score}; </span>
        <span>{new Date(time * 1000).toLocaleString("ru-RU")}</span>
      </div>
    </div>
  );
};

export default NewsItem;
