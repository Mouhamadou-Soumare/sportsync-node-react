import express from 'express';
import multer from 'multer';
import News from '../model/newsModel.js';
import { put } from '@vercel/blob';

const router = express.Router();
const upload = multer();

router.get('/list-all', async (req, res) => {
  try {
    const newsData = await News.find();
    const formattedNewsData = newsData.map(news => ({
      ...news._doc,
      date: news.date.toISOString().split('T')[0], 
    }));
    res.json(formattedNewsData);
  } catch (error) {
    console.error('Error retrieving news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const news = await News.findById(id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    const formattedNews = {
      ...news._doc,
      date: news.date.toISOString().split('T')[0], // Formatage de la date
    };
    res.json(formattedNews);
  } catch (error) {
    console.error('Error retrieving news by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/add-news', upload.single('file'), async (req, res) => {
  try {
    const currentDate = new Date().toISOString().slice(0, 10);

    // Upload de l'image vers Vercel Blob
    const { url } = await put(`images/${req.file.originalname}`, req.file.buffer, {
      access: 'public'
    });

    const newNews = new News({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      date: currentDate,
      image: url, // Utilisation de l'URL de l'image dans Vercel Blob
    });

    await newNews.save();

    res.status(201).json({ message: 'News added successfully', id: newNews._id });
  } catch (error) {
    console.error('Error adding news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedNews = await News.findByIdAndDelete(id);
    if (!deletedNews) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/update/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updatedNews = await News.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedNews) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json({ message: 'News updated successfully', news: updatedNews });
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
