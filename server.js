// server/server.js
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Your bot token and chat id (directly inserted)
const BOT_TOKEN = '8249494993:AAFsd41wclMXBSG7tyJh93k4HMnWYPFJxp0';
const CHAT_ID = '6277488109';

app.post('/send-name', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Missing name' });

    const text = `Name submitted: ${name}`;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const response = await axios.post(url, { chat_id: CHAT_ID, text });
    return res.json(response.data);
  } catch (err) {
    console.error(err?.response?.data || err.message || err);
    return res.status(500).json({ ok: false, error: err?.response?.data || err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));