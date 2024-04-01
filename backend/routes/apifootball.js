import express, { response } from 'express';
import axios from 'axios';
import 'dotenv/config'

const router = express.Router();


const API_KEY = process.env.FOOTBALL_API_KEY;
let sortedTopScorersCache = {
  data: [],
  lastUpdatedTime: null
};

let standingsCache = {
  data: [],
  lastUpdatedTime: null
};



const cacheMiddlewareTopScorers = async (req, res, next) => {
  const currentTime = new Date();

  if (sortedTopScorersCache.length > 0 && sortedTopScorersCache.lastUpdatedTime && (currentTime - sortedTopScorersCache.lastUpdatedTime) < (48 * 60 * 60 * 1000)) {
    console.log('Récupération des meilleurs buteurs triés depuis le cache');
    return res.json(sortedTopScorersCache);
  } else {
    console.log('Mise à jour des meilleurs buteurs triés depuis l\'API');
    next();
  }
};


const cacheMiddlewareStandings = async (req, res, next) => {
  const currentTime = new Date();

  if (
    standingsCache.data.length > 0 &&
    standingsCache.lastUpdatedTime &&
    currentTime - standingsCache.lastUpdatedTime < 72 * 60 * 60 * 1000
  ) {
    console.log('Récupération des classements depuis le cache');
    return res.json(standingsCache.data);
  } else {
    console.log('Mise à jour des classements depuis l\'API');
    next();
  }
};

async function getFixtures() {
  const competitions = [30, 61];
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() ); 
  const formattedDate = currentDate.toISOString().split('T')[0];
  const allFixtures = []; 

  try {
      for (const competitionId of competitions) {
          const response = await axios.get('https://api-football-v1.p.rapidapi.com/v3/fixtures', {
              headers: {
                  'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
                  'x-rapidapi-key': API_KEY
              },
              params: {
                  league: competitionId,
                  date: formattedDate,
                  season: '2023',
              }
          });

          const fixtures = response.data.response;
          allFixtures.push(...fixtures); 
      }

      return allFixtures;
  } catch (error) {
      console.error('Error fetching fixtures:', error);
      throw new Error('Error fetching fixtures');
  }
}

router.get('/direct', async (req, res) => {
  try {
      const fixtures = await getFixtures();
      res.json(fixtures);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


router.get('/topscorers', cacheMiddlewareTopScorers, async (req, res) => {
   const competitions = [1, 2, 3, 4, 5, 6, 7, 9, 11, 12, 13, 15, 39, 45, 61, 65, 66, 78, 81, 135, 137, 140, 143]; // Identifiants des compétitions spécifiées
  // const competitions = [39]; 
  const topScorersList = [];

  try {
    for (const competition of competitions) {
      const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/players/topscorers',
        params: {
          league: competition,
          season: '2023' 
        },
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      };

      const response = await axios.request(options);
      const topScorers = response.data.response;

      topScorersList.push(...topScorers);
    }

    

    const totalGoalsByPlayer = {};
    topScorersList.forEach(player => {
      const playerName = player.player.name;
      const goals = player.statistics[0].goals.total;
      const photo = player.player.photo;
      const team = player.statistics[0].team.name;
      const teamLogo = player.statistics[0].team.logo;
      const matchesPlayed = player.statistics[0].games.appearences;

      if (totalGoalsByPlayer[playerName]) {
        totalGoalsByPlayer[playerName].goals += goals;
        totalGoalsByPlayer[playerName].matchesPlayed += matchesPlayed;
      } else {
        totalGoalsByPlayer[playerName] = {
          goals: goals,
          photo: photo,
          team: team,
          teamLogo: teamLogo,
          matchesPlayed: matchesPlayed
        };
      }
    });

    const sortedTopScorers = Object.keys(totalGoalsByPlayer)
      .map(playerName => ({
            name: playerName,
            totalGoals: totalGoalsByPlayer[playerName].goals,
            photo: totalGoalsByPlayer[playerName].photo,
            team: totalGoalsByPlayer[playerName].team,
        teamLogo: totalGoalsByPlayer[playerName].teamLogo,
        matchesPlayed: totalGoalsByPlayer[playerName].matchesPlayed
      }))
      .sort((a, b) => b.totalGoals - a.totalGoals);


    sortedTopScorersCache = sortedTopScorers;
    sortedTopScorersCache.lastUpdatedTime = new Date();

    res.json(sortedTopScorers);
  } catch (error) {
    console.error('Erreur lors de la récupération des meilleurs buteurs :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des meilleurs buteurs' });
  }
});

router.get('/standings/:leagueId', cacheMiddlewareStandings, async (req, res) => {
  const { leagueId } = req.params;
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
    params: {
      season: '2023',
      league: leagueId
    },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };

  try {
    let standingsData;

    if (standingsCache.data.length > 0 && standingsCache.lastUpdatedTime) {
      console.log('Récupération des classements depuis le cache');
      standingsData = standingsCache.data;
      return res.json(standingsData);
    }

    console.log('Mise à jour des classements depuis l\'API');
    const response = await axios.request(options);
    standingsData = response.data;

    standingsCache.data = standingsData;
    standingsCache.lastUpdatedTime = new Date(); 
    res.json(standingsData);
  } catch (error) {
    console.error('Error fetching standings:', error);
    res.status(500).json({ error: 'Error fetching standings' });
  }
});





export default router;
