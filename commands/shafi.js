let shafiLines = [
  "👑 *Shafi* — not a name, it's a brand, a whole personality 💥",
  "🔥 When *Shafi* enters the chat, even silence pays attention 💬✨",
  "💫 Smart mind. Bold vibe. Loyal soul. That’s *Shafi* 🧠💯",
  "🌟 He’s not perfect, but he’s real — *Mr. Shafi* 💎",
  "❤️‍🔥 Warning: *Shafi’s* charm is highly addictive 😏💘",
  "🎯 One word: *Respect*. One man: *Shafi* 💪",
  "🚀 Whether it’s style or silence — *Shafi* always stands out ✨",
  "👀 Even confidence feels shy when *Shafi* walks in 😎🔥"
];

let shafiIndex = {};

async function shafiCommand(sock, chatId, message) {
  const user = message.key.participant || message.key.remoteJid;
  shafiIndex[user] = (shafiIndex[user] || 0) % shafiLines.length;

  const reply = shafiLines[shafiIndex[user]];
  shafiIndex[user]++;

  await sock.sendMessage(chatId, { text: reply }, { quoted: message });
}

module.exports = { shafiCommand };
