let pagalLines = [
  "🌸 *Halimah*, you're not just beautiful... you're *magical* ✨",
  "💘 Even your madness makes sense to my heart 💭 *Pagli Halimah*",
  "🌹 I don’t need the stars, I have *you* — my shining light 🌟",
  "🤍 You're the chaos I’d choose again and again *Halimah* 💫",
  "💌 Every moment with you feels like poetry, *Sweetest Pagli* 🥺",
  "👑 You’re not just special, you’re the *Queen* of my heart *Halimah* ❤️‍🔥",
  "🥰 Your smile is my favorite addiction, *crazy girl* 😘",
  "💖 If loving you is madness, I don’t want to be sane ever again 💭"
];

let pagalIndex = {};

async function pagalCommand(sock, chatId, message) {
  const user = message.key.participant || message.key.remoteJid;
  pagalIndex[user] = (pagalIndex[user] || 0) % pagalLines.length;

  const reply = pagalLines[pagalIndex[user]];
  pagalIndex[user]++;

  await sock.sendMessage(chatId, { text: reply }, { quoted: message });
}

module.exports = { pagalCommand };
