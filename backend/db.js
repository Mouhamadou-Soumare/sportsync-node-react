// db.js

import mongoose from 'mongoose';

const uri = 'mongodb+srv://mouhamadouetu:5smqJtb08AGd1GzY@cluster0.akgprfp.mongodb.net/sportsync';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
// Écoute l'événement de connexion réussie
db.once('open', () => {
    console.log('Connected to MongoDB');
  });
  
  // Écoute l'événement d'erreur de connexion
  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });
  
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default db;
