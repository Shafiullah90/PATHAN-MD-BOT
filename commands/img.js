const googleIt = require('google-it');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function imgCommand(sock, chatId, message) {
    try {
        // Extract text from message
        const text = message.message?.conversation || message.message?.extendedTextMessage?.text || '';
        let input = text.trim().slice(4).trim(); // Remove '.img'

        if (!input) {
            return await sock.sendMessage(chatId, { 
                text: '💡 Usage:\n.img <search query>\n.img <search query> <number of images>' 
            }, { quoted: message });
        }

        // Extract number of images if provided
        let numImages = 3; // default
        const countMatch = input.match(/\s(\d+)$/);
        if (countMatch) {
            numImages = parseInt(countMatch[1]);
            input = input.replace(/\s\d+$/, '').trim(); // remove number from query
        }

        if (numImages > 10) numImages = 10; // limit max
        if (numImages < 1) numImages = 1;

        // Send searching message
        await sock.sendMessage(chatId, { text: `🔍 Searching and generating ${numImages} image(s) for: "${input}"...` }, { quoted: message });

        // Search images using google-it
        const results = await googleIt({ query: input, additionalArgs: ['–num=20'] });
        const imageUrls = results
            .filter(r => r.link && /\.(jpg|jpeg|png|gif)$/i.test(r.link))
            .map(r => r.link);

        if (!imageUrls.length) {
            return await sock.sendMessage(chatId, { text: '❌ No images found!' }, { quoted: message });
        }

        const finalUrls = imageUrls.slice(0, numImages);

        // Send images one by one
        for (let i = 0; i < finalUrls.length; i++) {
            const url = finalUrls[i];
            try {
                const buffer = await axios.get(url, { responseType: 'arraybuffer' });
                await sock.sendMessage(chatId, {
                    image: buffer.data,
                    caption: `📷 Image ${i + 1} of ${finalUrls.length} for "${input}"`,
                }, { quoted: message });
            } catch (e) {
                console.error(`Error downloading image ${i + 1}:`, e.message);
            }
        }

    } catch (error) {
        console.error('[IMG] Command Error:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to generate/download image. Try again later.' }, { quoted: message });
    }
}

module.exports = imgCommand;
