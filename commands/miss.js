let missLines = [
  "💔 *𝙷𝚊𝚕𝚒𝚖𝚊𝚑 𝙿𝚊𝚐𝚕𝚒*, I miss you like the desert misses the rain ☔",
  "😔 Every moment without you feels like a year 💭 *𝙿𝚊𝚐𝚕𝚒 𝙷𝚊𝚕𝚒𝚖𝚊𝚑*",
  "🌙 Nights are longer when you’re not around 💫 *𝙷𝚊𝚕𝚒𝚖𝚊𝚑 𝙿𝚊𝚐𝚕𝚒*",
  "💘 My heart keeps whispering your name... *𝙿𝚊𝚐𝚕𝚒 𝙷𝚊𝚕𝚒𝚖𝚊𝚑* 😍",
  "😢 I tried to forget you, but the more I do, the more I miss you 💖"
];

let missIndex = {};

async function missCommand(sock, chatId, message) {
  const user = message.key.participant || message.key.remoteJid;
  missIndex[user] = (missIndex[user] || 0) % missLines.length;

  const replyText = missLines[missIndex[user]];
  missIndex[user]++;

  await sock.sendMessage(chatId, { text: replyText }, { quoted: message });
}

module.exports = { missCommand };
