import React, { useState, useEffect } from "react";
import useGetStandings from "../hooks/useGetStandings";
import pedriTired from "../assets/pedri_tired.jpg";
import Loader from "../components/Loader";

function Standings() {
  const [selectedLeague, setSelectedLeague] = useState("39");
  const { standings, loading, error } = useGetStandings(selectedLeague);

  const [leagueName, setLeagueName] = useState("");
  const [leagueLogo, setLeagueLogo] = useState("");
  const [classement, setClassement] = useState([]);
  const [showLoader, setShowLoader] = useState(true); // Affichage du loader avec délai

  useEffect(() => {
    if (!loading && standings.length > 0) {
      setLeagueName(standings[0].league.name);
      setLeagueLogo(standings[0].league.logo);
      setClassement(standings[0].league.standings);
    }
  }, [loading, standings]);

  // Gérer le changement de ligue
  const handleLeagueChange = (event) => {
    setSelectedLeague(event.target.value);
  };

  // Logique pour afficher le loader pendant 2 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false); // Masquer le loader après 2 secondes
    }, 2000); // 2 secondes minimum

    return () => clearTimeout(timer); // Nettoyage du timer
  }, [loading]);

  // Affichage du loader s'il est encore actif
  if (showLoader) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Affichage en cas d'erreur
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
          Une erreur est survenue lors du chargement des classements.
        </p>
        <p className="text-gray-500">
          Cela est probablement dû à une surconsommation de mes crédits sur l’API de football.
          <br />
          Merci de réessayer un peu plus tard
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:max-w-none lg:items-center">
        <h2 className="text-6xl text-center font-semibold leading-6 text-gray-900 mt-24 mb-14">
          Classement du championnat
        </h2>
        <div className="flex justify-center mb-8 items-center gap-3">
          <label htmlFor="league" className="mr-2 font-semibold">
            Choisir le championnat :
          </label>
          <select
            id="league"
            value={selectedLeague}
            onChange={handleLeagueChange}
            className="rounded border border-gray-300 px-3 py-1"
          >
            <option value="39">Premier League</option>
            <option value="61">Ligue 1</option>
          </select>
          <img src={leagueLogo} className="w-20" alt={leagueName} />
        </div>
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Position
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Équipe
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Matches joués
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Victoires
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Défaites
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {classement.length > 0 &&
              classement[0].map((teamData, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {teamData.rank}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex flex-row items-center gap-2">
                    <img src={teamData.team.logo} className="w-6" alt={teamData.team.name} />
                    {teamData.team.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {teamData.all.played}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {teamData.all.win}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {teamData.all.lose}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Standings;
