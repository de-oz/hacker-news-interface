import axios from "axios";

export default async function getItem(id) {
  try {
    const { data: item } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );

    return item;
  } catch (error) {
    console.log("Failed to get the item: " + error.message);
  }
}
