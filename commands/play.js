const yts = require('yt-search');
const axios = require('axios');

async function playCommand(sock, chatId, message) {
    try {
        const text = message.message?.conversation || message.message?.extendedTextMessage?.text;
        const searchQuery = text.split(' ').slice(1).join(' ').trim();

        if (!searchQuery) {
            return await sock.sendMessage(chatId, {
                text: "🎧 What song do you want to download?\nExample: `.play Alan Walker Faded`"
            });
        }

        // Search YouTube for the song
        const { videos } = await yts(searchQuery);
        if (!videos || videos.length === 0) {
            return await sock.sendMessage(chatId, {
                text: "❌ No matching results found!"
            });
        }

        // Inform user that the download is in progress
        await sock.sendMessage(chatId, {
            text: "🔄 Please wait, your audio is being fetched..."
        });

        const video = videos[0];
        const urlYt = video.url;

        // Call audio API
        const response = await axios.get(`https://apis.davidcyriltech.my.id/youtube/mp3?url=${urlYt}`);
        const data = response.data;

        if (!data || !data.status || !data.result || !data.result.downloadUrl) {
            return await sock.sendMessage(chatId, {
                text: "⚠️ Failed to fetch audio from server. Try again later."
            });
        }

        const audioUrl = data.result.downloadUrl;
        const title = data.result.title;

        // Send the audio
        await sock.sendMessage(chatId, {
            audio: { url: audioUrl },
            mimetype: "audio/mpeg",
            fileName: `${title}.mp3`
        }, { quoted: message });

    } catch (error) {
        console.error('Error in play command:', error);
        await sock.sendMessage(chatId, {
            text: "❌ Download failed. Please try again later."
        });
    }
}

module.exports = playCommand;

/*
╭──────────────────────────────╮
│ 🔊 Powered by IMRAN-BOT 🎵   │
│ 🎧 YT-MP3 Auto Downloader    │
│ 🔗 GitHub: github.com/ahmadtech12 │
╰──────────────────────────────╯
*/
