let haleemahLines = [
  "👑 *Haleemah* — not just a name, it’s a whole feeling 💘",
  "💫 When she smiles, the world slows down — *Haleemah* style 😍",
  "🌷 Grace in her words, magic in her heart — that’s *Haleemah* 💖",
  "🌸 She’s not just beautiful, she’s art in motion — *Haleemah* 🎨",
  "🕊️ If kindness had a face, it would be *Haleemah’s* ✨",
  "💌 Every heartbeat spells one name — *Haleemah* 💗",
  "💫 In the crowd of billions, she's the one who stands out — *My Haleemah* 🌹",
  "🌙 Even the moon hides when *Haleemah* shines 🌟"
];

let haleemahIndex = {};

async function haleemahCommand(sock, chatId, message) {
  const user = message.key.participant || message.key.remoteJid;
  haleemahIndex[user] = (haleemahIndex[user] || 0) % haleemahLines.length;

  const reply = haleemahLines[haleemahIndex[user]];
  haleemahIndex[user]++;

  await sock.sendMessage(chatId, { text: reply }, { quoted: message });
}

module.exports = { haleemahCommand };
