import { useState, useEffect } from "react";
import axios from "axios";

const useGetTopScorers = () => {
  const [topScorers, setTopScorers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000"; // Utilisation de la variable d'environnement

  useEffect(() => {
    const fetchTopScorers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${baseUrl}/footballapi/topscorers`
        );
        setTopScorers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }; 

    fetchTopScorers();

    return () => {};
  }, []);

  return { topScorers, loading, error };
};

export default useGetTopScorers;
