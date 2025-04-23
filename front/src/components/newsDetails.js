import React from "react";
import { useParams } from "react-router-dom";
import useGetNewsById from "../hooks/useGetNewsById";
import "react-quill/dist/quill.snow.css";

function NewsDetails() {
  const { id } = useParams();
  const { news, loading, error } = useGetNewsById(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!news) {
    return <div>News not found</div>;
  }

  // Fonction pour convertir le contenu HTML en texte brut
  const decodeHTML = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {news.title}
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">{news.date}</p>
        </div>
        <div className="mx-auto mt-16">
          <img
            src={news.image}
            alt={news.title}
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="mx-auto mt-12 max-w-2xl text-left text-gray-700">
          <p dangerouslySetInnerHTML={{ __html: decodeHTML(news.content) }}></p>
          <p className="mt-6">Auteur: {news.author}</p>
        </div>
      </div>
    </div>
  );
}

export default NewsDetails;
