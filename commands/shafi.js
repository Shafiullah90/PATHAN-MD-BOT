// commands/shafi.js
const settings = require('../settings.js');

// Add as many picture URLs as you like
const shafiImages = [
    "https://i.ibb.co/x8ZyYyN/shafi1.jpg",
    "https://i.ibb.co/2dqfqyH/shafi2.jpg",
    "https://i.ibb.co/PGN7XhR/shafi3.jpg"
];

async function shafiCommand(sock, chatId, message) {
    try {
        // Pick a random image each time
        const randomImg = shafiImages[Math.floor(Math.random() * shafiImages.length)];
        const sender = message.key.participant || message.key.remoteJid;

        const caption = 
`💎 *SHAFI PATHAN* 💎

🔥 Always Stylish  
🌍 Unique Personality  
💖 Loved by Everyone  

👤 Requested by: @${sender.split('@')[0]}`;

        await sock.sendMessage(
            chatId,
            {
                image: { url: randomImg },
                caption: caption,
                mentions: [sender]
            },
            { quoted: message }
        );
    } catch (err) {
        console.error("Shafi command error:", err);
        await sock.sendMessage(chatId, { text: "❌ Failed to load Shafi’s style!" });
    }
}

module.exports = shafiCommand;
