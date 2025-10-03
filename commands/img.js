// commands/img.js
const axios = require('axios');
const { fetchBuffer } = require('../lib/myfunc'); // Assuming you have this utility

module.exports = {
  name: 'img',
  alias: ['img', 'image', 'photo'],
  description: 'Download images from query',
  category: 'fun',

  async run({ conn, m, args }) {
    try {
      const chatId = m.chat;

      // Get the query and optional number of images
      if (!args || args.length === 0) {
        return await conn.sendMessage(chatId, { text: "❌ Provide a search query!\nExample: *.img sunset 3*" }, { quoted: m });
      }

      // Extract last arg if it is a number
      let num = 3; // default
      const lastArg = args[args.length - 1];
      let query = args.join(' ');

      if (!isNaN(lastArg)) {
        num = Math.min(parseInt(lastArg), 5); // Limit max to 5 images
        query = args.slice(0, -1).join(' ');
      }

      if (!query) {
        return await conn.sendMessage(chatId, { text: "❌ Please provide a valid search query." }, { quoted: m });
      }

      // Send "processing" message
      const processingMsg = await conn.sendMessage(chatId, { text: `🔍 Searching for "${query}"...` }, { quoted: m });

      // Make API request to fetch images (here using Pexels API as example)
      const API_KEY = 'YOUR_PEXELS_API_KEY'; // Replace with your API key
      const response = await axios.get('https://api.pexels.com/v1/search', {
        headers: { Authorization: API_KEY },
        params: { query, per_page: num }
      });

      const photos = response.data.photos;

      if (!photos || photos.length === 0) {
        return await conn.sendMessage(chatId, { text: `❌ No images found for "${query}".` }, { quoted: m });
      }

      // Download and send each image
      for (let photo of photos) {
        const buffer = await fetchBuffer(photo.src.original);
        await conn.sendMessage(chatId, { image: buffer, caption: `📷 Image for "${query}"` });
      }

      // Delete processing message
      await conn.sendMessage(chatId, { delete: processingMsg.key });

    } catch (err) {
      console.error('❌ Image command error:', err);
      await conn.sendMessage(chatId, { text: '❌ Failed to fetch images. Please try again later.' }, { quoted: m });
    }
  }
};
