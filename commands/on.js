async function onCommand(sock, chatId, message) {
  const caption = `✨ 𝙸'𝚖 𝙰𝚕𝚒𝚟𝚎 & 𝚁𝚞𝚗𝚗𝚒𝚗𝚐 ✨

🤴 𝙾𝚠𝚗𝚎𝚛: 𝐇𝐚𝐥𝐢𝐦𝐚𝐡 𝐏𝐚𝐠𝐥𝐢 💫
🛠️ 𝙲𝚛𝚎𝚊𝚝𝚘𝚛: 𝐇𝐚𝐥𝐢𝐦𝐚𝐡 𝐁𝐨𝐭𝐳 💖
🚀 𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢: 𝙻𝚘𝚟𝚎 & 𝙲𝚘𝚍𝚎 ❤️‍🔥`;

  const imageUrl = 'https://files.catbox.moe/7ewe7z.jpeg'; // Replace with your alive pic

  await sock.sendMessage(chatId, {
    image: { url: imageUrl },
    caption
  }, { quoted: message });
}


    try {
        const imagePath = path.join(__dirname, '../assets/menu_image.jpg');
        
        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            
            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '@newsletter',
                        newsletterName: '',
                        serverMessageId: -1
                    }      
                module.exports = { onCommand };
