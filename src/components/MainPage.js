import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setIntervalId, stopInterval } from "../redux/refreshSlice";
import { setNews } from "../redux/newsSlice";
import NewsItem from "./NewsItem";
import getItem from "./getItem";
import "../styles/MainPage.scss";

const NUMBER_OF_NEWS = 100;

function MainPage() {
  const news = useSelector((state) => state.news.newsItems);
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  async function getNews() {
    try {
      setLoading(true);

      const { data: itemIds } = await axios.get(
        `https://hacker-news.firebaseio.com/v0/newstories.json`
      );

      const newsList = await Promise.all(
        itemIds.slice(0, NUMBER_OF_NEWS).map(getItem)
      );

      dispatch(setNews(newsList));

      setLoading(false);

      return;
    } catch (error) {
      console.log("Failed to update the news: " + error.message);
      setLoading(false);
    }
  }

  function newsRefresh() {
    getNews();

    dispatch(stopInterval()); // clear current refreshing interval

    // create updated refreshing interval from a new point in time
    dispatch(
      setIntervalId(
        setInterval(() => {
          getNews();
        }, 60000)
      )
    );
  }

  useEffect(() => {
    newsRefresh(); // load up-to-date news on mount

    return () => {
      dispatch(setNews([])); // empty news state on unmount (page switch)
      dispatch(stopInterval()); // clear refreshing interval on unmount
    };
  }, []);

  return (
    <>
      <h2 className="subheading">Main Page / Latest News</h2>
      <button className="refresh-btn" type="button" onClick={newsRefresh}>
        Refresh
      </button>
      <ul>
        {isLoading || !news.length ? (
          <p className="loading">Loading...</p>
        ) : (
          news.map((item) => {
            if (!item) return;
            return <NewsItem item={item} key={item.id} />;
          })
        )}
      </ul>
    </>
  );
}

export default MainPage;
