import mongoose from 'mongoose';
import News from './model/newsModel.js';
import fs from 'fs';
import dotenv from 'dotenv';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Vérifier que la variable d'environnement DB_KEY est définie
if (!process.env.DB_KEY) {
  console.error('La variable d\'environnement DB_KEY n\'est pas définie.');
  process.exit(1); // Arrêter le processus si la variable n'est pas définie
}

// Utilisation de fs pour lire le fichier JSON
const newsData = JSON.parse(fs.readFileSync('./news.json', 'utf-8'));

// Connexion à MongoDB
const uri = process.env.DB_KEY;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', async () => {
  try {
    // Insérer les données dans la collection 'news'
    await News.insertMany(newsData);
    console.log('Données importées avec succès');
    process.exit(0); // Arrêter le processus une fois l'import terminé
  } catch (error) {
    console.error('Erreur lors de l\'import des données :', error);
    process.exit(1); // Arrêter le processus en cas d'erreur
  }
});
