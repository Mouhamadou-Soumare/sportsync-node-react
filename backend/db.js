import mongoose from 'mongoose';

// Récupérer la clé de connexion à la base de données depuis les variables d'environnement
const db_key = process.env.DB_KEY;

// Vérifier si la clé de connexion est définie
if (!db_key) {
  console.error('No DB key provided. Make sure to set the DB_key environment variable.');
  process.exit(1); // Arrêter l'exécution du processus si la clé de connexion n'est pas définie
}

// Connexion à la base de données MongoDB
mongoose.connect(db_key, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Écoute l'événement de connexion réussie
db.once('open', () => {
  console.log('Connected to MongoDB');
  console.log(db);
});

// Écoute l'événement d'erreur de connexion
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

export default db;
