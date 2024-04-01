import { useState } from "react";
import axios from "axios";

function useDeleteNews() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteNews = async (id) => {
    console.log(id);
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${baseUrl}/news/delete/${id}`);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { deleteNews, loading, error };
}

export default useDeleteNews;
