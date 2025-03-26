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

  // 🙏 Daily Duas for Ramadan
app.get('/ramadan/dua', authenticateToken, (req, res) => {
    res.json({
      duas: [
        " O Allah, You are Most Forgiving, and You love forgiveness; so forgive me.",
        "اللهم بلغنا رمضان — O Allah, allow us to reach Ramadan.",
        "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ — Our Lord, accept [this] from us. Indeed, You are the Hearing, the Knowing.",
        "اللهم اجعلني من عتقاء هذا الشهر — O Allah, make me among those freed from the Hellfire this Ramadan."
      ]
    });
  });
  
  // 🌠 Random Ramadan Quote
// app.get('/ramadan/quotes/random', authenticateToken, (req, res) => {
//     const quotes = [
//       "Ramadan is the month whose beginning is mercy, whose middle is forgiveness and whose end is freedom from fire.",
//       "When the month of Ramadan starts, the gates of the heaven are opened and the gates of Hell are closed.",
//       "Fasting is a shield with which a servant protects himself from the fire.",
//       "Whoever fasts Ramadan out of faith and in the hope of reward will be forgiven his previous sins.",
//       "Ramadan is not just about fasting from food, it's about feeding the soul with goodness.",
//       "Let your kindness during Ramadan flow like a river—endless and full of life."
//     ];
//     const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
//     res.json({ quote: randomQuote });
//   });
  
app.get('/ramadan/calendar', authenticateToken, (req, res) => {
    res.json({
      calendar: [
        { day: 1, event: "Start of Ramadan" },
        { day: 17, event: "Battle of Badr (historical)" },
        { day: 19, event: "Beginning of the last 10 nights" },
        { day: 21, event: "Possibility of Laylat al-Qadr" },
        { day: 27, event: "Commonly observed Laylat al-Qadr" },
        { day: 29, event: "End of Ramadan (depending on moon sighting)" },
        { day: 30, event: "Eid al-Fitr (if 30 days complete)" }
      ]
    });
  });

  // 📜 Historical Background of Ramadan
app.get('/ramadan/history', authenticateToken, (req, res) => {
    res.json({
      history:
        "Ramadan is the ninth month of the Islamic calendar. It was during this month that the Quran was first revealed to the Prophet Muhammad (peace be upon him). Muslims have observed fasting during this month for centuries, following the commandment from Allah to seek Taqwa (God-consciousness)."
    });
  });
  
  // 💰 Info about Zakat al-Fitr
app.get('/ramadan/zakat', authenticateToken, (req, res) => {
    res.json({
      zakat: {
        purpose: "Zakat al-Fitr is a mandatory charity given by Muslims at the end of Ramadan to purify their fast and help those in need.",
        amount: "The amount is typically the cost of one meal per person in your household.",
        deadline: "Must be paid before the Eid prayer.",
        recipients: "Poor and needy individuals within your community."
      }
    });
  });

  
 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
 