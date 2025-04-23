import React, { useState, useEffect } from "react";
import useGetTopScorers from "../hooks/useGetTopScorers";
import pedriTired from "../assets/pedri_tired.jpg";
import Loader from "../components/Loader";

function AllTopScorers() {
  const { topScorers, loading, error } = useGetTopScorers();
  const [sortByGoals, setSortByGoals] = useState("desc");
  const [showLoader, setShowLoader] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [loading]); 

  const handleSortChange = () => {
    setSortByGoals(sortByGoals === "desc" ? "asc" : "desc");
  };

  const sortedTopScorers = [...topScorers].sort((a, b) => {
    if (sortByGoals === "desc") {
      return b.totalGoals - a.totalGoals;
    } else {
      return a.totalGoals - b.totalGoals;
    }
  });

  console.log(sortedTopScorers);

  if (showLoader) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <img
          src={pedriTired}
          alt="Erreur API"
          className="w-32 h-32 mb-6 rounded-full"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Oups !</h2>
        <p className="text-gray-600 mb-2">
          Une erreur est survenue lors du chargement des meilleurs buteurs.
        </p>
        <p className="text-gray-500">
          Cela est probablement dû à une surconsommation de mes crédits sur l’API de football.
          <br />
          Merci de réessayer un peu plus tard.
        </p>
      </div>
    );
  }

  // Affichage des meilleurs buteurs lorsque les données sont chargées
  return (
    <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:max-w-none lg:items-center">
        <h2 className="text-6xl text-center font-semibold leading-6 text-gray-900 mt-24 mb-14">
          Meilleurs buteurs
        </h2>
        <button onClick={handleSortChange}>
          {sortByGoals === "desc" ? "Sort Ascending" : "Sort Descending"}
        </button>
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nom du joueur
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nationalité
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Équipe en club
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nombre de buts
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedTopScorers.map((player) => {
              return (
                <tr key={player.id}>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <img
                      src={player.photo}
                      alt={player.name}
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                    {player.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {player.nationality}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <img
                      src={player.teamLogo}
                      alt={player.team}
                      className="w-8 h-8 mr-2"
                    />
                    {player.team}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {player.totalGoals}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllTopScorers;
