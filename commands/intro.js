async function introCommand(sock, chatId, message) {
  const imageUrl = 'https://files.catbox.moe/7ewe7z.jpeg'; // 🔁 Replace with your pic URL

  const introText = `
👑 *I'm Shafi Pathan*
🌍 From: *Afghanistan*
🗣️ I speak *5 languages* fluently  
💻 Skilled in *JavaScript, HTML, CSS*
⚙️ Created & designed this bot *fully by myself*
🚀 Always learning, always building 💡

📸 *Profile:* [Click to view](${imageUrl})
  `;

  await sock.sendMessage(chatId, {
    image: { url: imageUrl },
    caption: introText
  }, { quoted: message });
}

module.exports = { introCommand };
