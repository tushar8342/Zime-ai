// utils/api.js
export const fetchData = async () => {
    const response = await fetch(`https://dummyjson.com/posts?limit=100`);
    return await response.json();
  };
  