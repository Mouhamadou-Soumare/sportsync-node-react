// importData.js

import mongoose from 'mongoose';
import News from './model/newsModel.js';
import newsData from './news.json'  assert { type: "json" };;

const uri = 'mongodb://localhost:27017/sportsync';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', async () => {
  try {
    await News.insertMany(newsData);
    console.log('Data imported successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
});