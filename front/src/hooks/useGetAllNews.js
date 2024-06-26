import { useState, useEffect } from "react";
import axios from "axios";

function useGetAllNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000"; // Utilisation de la variable d'environnement
  const fetchNews = async () => {
    try {
      const response = await axios.get(`${baseUrl}/news/list-all`); 
      setNews(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchNews();
  };
  console.log((`${baseUrl}/news/list-all`));
  return { news, loading, error, refetch };
}

export default useGetAllNews;
