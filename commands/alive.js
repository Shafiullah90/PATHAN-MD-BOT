async function imAliveCommand(sock, chatId, message) {
  const aliveCaption = `✨ *I'm Alive*\n\n🤴 *Owner:* Halimah Pagli\n🛠️ *Creator:* Shafi Botz\n🚀 Running Smoothly!`;

  const imageUrl = 'https://files.catbox.moe/7ewe7z.jpeg'; // Replace with a nice image URL

  await sock.sendMessage(chatId, {
    image: { url: imageUrl },
    caption: aliveCaption
  }, { quoted: message });
}

module.exports = { imAliveCommand };
