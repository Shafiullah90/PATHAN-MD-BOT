let shutoffLines = [
  "🚫 Calm down. This group isn’t for your drama. Sit down. 🔇",
  "⚠️ Mind your words. Respect earns respect. 🧠",
  "❌ Don’t test limits. You're one message away from getting kicked. 👣",
  "🛑 Chill out or get out. Simple. No space for toxic vibes here. 👋",
  "💢 This is your only warning. Don’t force me to react. 😐",
  "🔕 Silence is better than nonsense. Learn it. 💭",
  "👊 This isn’t the place for ego fights. Respect the space or leave. 🚪"
];

let shutoffIndex = {};

async function shutoffCommand(sock, chatId, message) {
  const user = message.key.participant || message.key.remoteJid;
  shutoffIndex[user] = (shutoffIndex[user] || 0) % shutoffLines.length;

  const reply = shutoffLines[shutoffIndex[user]];
  shutoffIndex[user]++;

  await sock.sendMessage(chatId, { text: reply }, { quoted: message });
}

module.exports = { shutoffCommand };
