import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NewsItem from "./NewsItem";

const NUMBER_OF_NEWS = 100;

function MainPage() {
  const [news, setNews] = useState([]);
  const [intervalId, setIntervalId] = useState();

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

  function updateNewsState() {
    getNews()
      .then((news) => {
        setNews(news);
        console.log(news);
      })
      .catch((error) => {
        console.log("Failed to update the news state: " + error.message);
      });
  }

  function newsRefresh() {
    updateNewsState();

    setIntervalId(
      setInterval(() => {
        updateNewsState();
      }, 60000)
    );
  }

  useEffect(() => {
    newsRefresh();

    return () => clearInterval(intervalId);
  }, []);

  function buttonRefresh() {
    clearInterval(intervalId);

    newsRefresh();
  }

  return (
    <>
      <Link to="/story">News Page</Link>
      <div>MainPage</div>
      <button type="button" onClick={buttonRefresh}>
        Refresh
      </button>
      <ul>
        {news.map((item) => {
          return <NewsItem item={item} key={item.id} />;
        })}
      </ul>
    </>
  );
}

export default MainPage;
