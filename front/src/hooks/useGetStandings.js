import { useState, useEffect } from "react";
import axios from "axios";

const useGetStandings = (initialLeagueId) => {
  const [leagueId, setLeagueId] = useState(initialLeagueId);
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000"; 


  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${baseUrl}/footballapi/standings/${leagueId}`
        );
        console.log(response.data.response);
        setStandings(response.data.response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchStandings();

    return () => {};
  }, [leagueId]);

  const handleLeagueChange = (newLeagueId) => {
    setLeagueId(newLeagueId);
  };

  return { standings, loading, error, handleLeagueChange };
};

export default useGetStandings;
