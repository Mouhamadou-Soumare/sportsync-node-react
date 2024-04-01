import { useState, useEffect } from "react";
import axios from "axios";

const useLiveFixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000"; // Utilisation de la variable d'environnement

  useEffect(() => {
    const fetchFixtures = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${baseUrl}/footballapi/direct`
        );
        setFixtures(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchFixtures();

    return () => {};
  }, []);
  return { fixtures, loading, error };
};

export default useLiveFixtures;
