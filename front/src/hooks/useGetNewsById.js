import { useState, useEffect } from "react";
import axios from "axios";

function useGetNewsById(id) {
  console.log(id);
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000"; // Utilisation de la variable d'environnement

  useEffect(() => {
    const fetchNewsById = async () => {
      try {
        const response = await axios.get(`${baseUrl}/news/${id}`);
        setNews(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (id) {
      fetchNewsById();
    }
  }, [id]);

  return { news, loading, error };
}

export default useGetNewsById;
