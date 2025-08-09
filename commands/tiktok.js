const axios = require('axios');

// Store processed message IDs to prevent duplicates
const processedMessages = new Set();

async function tiktokCommand(sock, chatId, message) {
    try {
        // Prevent duplicate processing
        if (processedMessages.has(message.key.id)) return;
        processedMessages.add(message.key.id);
        setTimeout(() => processedMessages.delete(message.key.id), 5 * 60 * 1000);

        const text = message.message?.conversation || message.message?.extendedTextMessage?.text;
        if (!text) {
            return await sock.sendMessage(chatId, {
                text: "📌 Please provide a TikTok video link."
            });
        }

        const url = text.split(' ').slice(1).join(' ').trim();
        if (!url) {
            return await sock.sendMessage(chatId, {
                text: "📌 Please provide a TikTok video link."
            });
        }

        // Validate TikTok link
        const tiktokPatterns = [
            /https?:\/\/(?:www\.)?tiktok\.com\//,
            /https?:\/\/(?:vm\.)?tiktok\.com\//,
            /https?:\/\/(?:vt\.)?tiktok\.com\//,
            /https?:\/\/(?:www\.)?tiktok\.com\/@/,
            /https?:\/\/(?:www\.)?tiktok\.com\/t\//
        ];

        const isValidUrl = tiktokPatterns.some(pattern => pattern.test(url));
        if (!isValidUrl) {
            return await sock.sendMessage(chatId, {
                text: "❌ Invalid TikTok link. Please make sure it starts with https://www.tiktok.com/ or similar."
            });
        }

        await sock.sendMessage(chatId, {
            react: { text: '🔄', key: message.key }
        });

        try {
            // New TikTok API with watermark
            const apiResponse = await axios.get(`https://iamtkm.vercel.app/downloaders/tiktokdl?url=${encodeURIComponent(url)}`);
            const data = apiResponse.data;

            if (data && data.status && data.result && data.result.watermark) {
                const videoUrl = data.result.watermark;
                const title = data.result.title || "TikTok Video";

                // Custom caption with branding
                const caption = `🎬 *TikTok Download Complete!*\n\n📄 *Title:* ${title}\n\n🔗 *Source:* TikTok\n\n🤖 Powered by *IMRAN-BOT*`;

                await sock.sendMessage(chatId, {
                    video: { url: videoUrl },
                    mimetype: "video/mp4",
                    caption: caption
                }, { quoted: message });
            } else {
                return await sock.sendMessage(chatId, {
                    text: "⚠️ Failed to fetch video. Please try a different link."
                });
            }

        } catch (error) {
            console.error('Error in TikTok API:', error);
            await sock.sendMessage(chatId, {
                text: "❌ Failed to download the TikTok video. Try again later."
            });
        }
    } catch (error) {
        console.error('Error in TikTok command:', error);
        await sock.sendMessage(chatId, {
            text: "🚫 An unexpected error occurred. Please try again."
        });
    }
}

module.exports = tiktokCommand;
