async function aliveCommand(sock, chatId, message) {
  const caption = `✅ *I'm Alive*\n\n🤴 Owner: Halimah Pagli\n🛠️ Creator: Shafi Botz\n❤️ Always here!`;
  const imageUrl = 'https://files.catbox.moe/7ewe7z.jpeg'; // Replace with your image URL

  await sock.sendMessage(chatId, {
    image: { url: imageUrl },
    caption
  }, { quoted: message });
}

module.exports = { aliveCommand };
