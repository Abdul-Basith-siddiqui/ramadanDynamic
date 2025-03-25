// app.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { authenticateToken, SECRET } = require('./auth');
const { ramadan } = require('./data');
const cors = require('cors');
 
 
const app = express();
app.use(express.json());
app.use(cors());
// 🔐 Mock login for token
// app.post('/login', (req, res) => {
//   const { username } = req.body;
//   const user = { name: username || 'guest' };
//   const token = jwt.sign(user, SECRET, { expiresIn: '1h' });
//   res.json({ token });
// });
// app.js
app.post('/login', (req, res) => {
  const { username } = req.body;
  const user = { name: username || 'guest' };
 
  const token = jwt.sign(user, SECRET, {
    expiresIn: '1h',
    issuer: 'myapi.example.com', // <-- Add issuer here
     audience: 'myapi-client'
  });
 
  res.json({ token });
});
// 📖 General info
app.get('/ramadan', authenticateToken, (req, res) => {
  res.json({
    month: ramadan.month,
    description: ramadan.description,
  });
});
 
// 📅 Which month is Ramadan?
app.get('/ramadan/month', authenticateToken, (req, res) => {
  res.json({
    name: ramadan.month,
    number: ramadan.number,
    message: `${ramadan.month} is the ${ramadan.number}th month of the Islamic calendar.`,
  });
});
 
// 🌟 Benefits of Ramadan
app.get('/ramadan/benefits', authenticateToken, (req, res) => {
  res.json({
    benefits: ramadan.benefits,
  });
});
 
// 🌅 Info about fasting
app.get('/ramadan/fasting', authenticateToken, (req, res) => {
  res.json({
    fasting: ramadan.fasting,
  });
});
 
// 🌇 Info about Iftar
app.get('/ramadan/iftar', authenticateToken, (req, res) => {
  res.json({
    iftar: ramadan.iftar,
  });
});
 
// 🌄 Info about Suhoor
app.get('/ramadan/suhoor', authenticateToken, (req, res) => {
  res.json({
    suhoor: ramadan.suhoor,
  });
});
 
// 🕌 Info about Taraweeh prayers
app.get('/ramadan/prayers', authenticateToken, (req, res) => {
  res.json({
    prayers: ramadan.prayers,
  });
});

// 📿 Daily Good Deeds during Ramadan
app.get('/ramadan/good-deeds', authenticateToken, (req, res) => {
    res.json({
      deeds: [
        "Smile at someone",
        "Give charity anonymously",
        "Call a family member",
        "Help a neighbor",
        "Read a page of the Quran",
        "Feed a fasting person",
        "Make sincere dua for others"
      ]
    });
  });

  // 🌙 Inspirational Quotes for Ramadan
app.get('/ramadan/quotes', authenticateToken, (req, res) => {
    res.json({
      quotes: [
        "Ramadan is the month whose beginning is mercy, whose middle is forgiveness and whose end is freedom from fire.",
        "When the month of Ramadan starts, the gates of the heaven are opened and the gates of Hell are closed.",
        "Fasting is a shield with which a servant protects himself from the fire.",
        "Whoever fasts Ramadan out of faith and in the hope of reward will be forgiven his previous sins.",
        "Ramadan is a time to empty your stomach to feed your soul."
      ]
    });
  });
  

  // ✅ Daily Fasting Tips
app.get('/ramadan/tips', authenticateToken, (req, res) => {
    res.json({
      tips: [
        "Stay hydrated between Iftar and Suhoor by drinking plenty of water.",
        "Avoid overeating during Iftar to maintain energy levels.",
        "Include fruits and dates to replenish energy quickly.",
        "Get enough sleep to help your body rest and recover.",
        "Make time for daily Quran recitation and reflection.",
        "Break your fast with dates and water, following the Sunnah."
      ]
    });
  });
  
  
 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
 