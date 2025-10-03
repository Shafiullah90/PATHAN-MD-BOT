const axios = require('axios');

async function imgCommand(sock, chatId, message) {
    try {
        const text = message.message?.conversation || message.message?.extendedTextMessage?.text || '';
        let input = text.trim().slice(4).trim(); // remove ".img"

        if (!input) {
            return await sock.sendMessage(chatId, { 
                text: '💡 Usage:\n.img <search query>\n.img <search query> <number of images>' 
            }, { quoted: message });
        }

        // extract number of images (default 3)
        let numImages = 3;
        const countMatch = input.match(/\s(\d+)$/);
        if (countMatch) {
            numImages = parseInt(countMatch[1]);
            input = input.replace(/\s\d+$/, '').trim();
        }
        if (numImages > 5) numImages = 5; // limit to 5 max
        if (numImages < 1) numImages = 1;

        // Notify searching
        await sock.sendMessage(chatId, { text: `🔍 Searching ${numImages} images for: "${input}"...` }, { quoted: message });

        // Use Lexica API for free images
        const apiUrl = `https://lexica.art/api/v1/search?q=${encodeURIComponent(input)}`;
        const response = await axios.get(apiUrl);

        if (!response.data.images || response.data.images.length === 0) {
            return await sock.sendMessage(chatId, { text: `❌ No images found for "${input}"` }, { quoted: message });
        }

        const finalImgs = response.data.images.slice(0, numImages);

        for (let i = 0; i < finalImgs.length; i++) {
            await sock.sendMessage(chatId, {
                image: { url: finalImgs[i].srcSmall || finalImgs[i].src },
                caption: `📷 Result ${i + 1}/${finalImgs.length} for: *${input}*\n\n> Downloaded by PATHAN BOT`
            }, { quoted: message });
        }

    } catch (err) {
        console.error("[IMG CMD ERROR]", err);
        await sock.sendMessage(chatId, { text: '❌ Failed to fetch images, please try again later.' }, { quoted: message });
    }
}

module.exports = imgCommand;
