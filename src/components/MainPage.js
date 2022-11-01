import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NewsItem from "./NewsItem";

const NUMBER_OF_NEWS = 100;

function MainPage() {
  const [news, setNews] = useState([]);

  async function getItem(id) {
    try {
      const { data: item } = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );

      return item;
    } catch (error) {
      console.log("Failed to get the item: " + error.message);
    }
  }

  async function getNews() {
    try {
      const { data: itemIds } = await axios.get(
        `https://hacker-news.firebaseio.com/v0/newstories.json`
      );

      const news = await Promise.all(
        itemIds.slice(0, NUMBER_OF_NEWS).map(getItem)
      );

      return news;
    } catch (error) {
      console.log("Failed to get the news: " + error.message);
    }
  }

  useEffect(() => {
    getNews()
      .then((news) => {
        setNews(news);
      })
      .catch((error) => {
        console.log("Failed to update the news state: " + error.message);
      });
  }, []);

  return (
    <>
      <Link to="/story">Story Page</Link>
      <div>MainPage</div>
      <ul>
        {news.map((item) => {
          return <NewsItem item={item} key={item.id} />;
        })}
      </ul>
    </>
  );
}

export default MainPage;
