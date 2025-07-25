const fetch = require('node-fetch');

let loveLines = [
  "💖 *𝙿𝚊𝚐𝚕𝚒 𝙷𝚊𝚕𝚒𝚖𝚊𝚑*, if loving you is madness, I don't want to be sane 😘",
  "🥰 *𝙷𝚊𝚕𝚒𝚖𝚊𝚑 𝙿𝚊𝚐𝚕𝚒*, when you smile, it feels like everything will be alright 🌟",
  "❤️ Your crazy lover, always yours *𝙿𝚊𝚐𝚕𝚒 𝙷𝚊𝚕𝚒𝚖𝚊𝚑* 💋",
  "🌙 *𝙿𝚊𝚐𝚕𝚒 𝙷𝚊𝚕𝚒𝚖𝚊𝚑*, even the moon hides behind the clouds when you smile 🌌",
  "✨ *𝙷𝚊𝚕𝚒𝚖𝚊𝚑*, are you a magician? Because whenever I look at you, everyone else disappears 💫"
];

let userLoveIndex = {};

async function pagalCommand(sock, chatId, message) {
  const user = message.key.participant || message.key.remoteJid;
  userLoveIndex[user] = (userLoveIndex[user] || 0) % loveLines.length;

  const replyText = loveLines[userLoveIndex[user]];
  userLoveIndex[user]++;

  await sock.sendMessage(chatId, { text: replyText }, { quoted: message });
}

module.exports = { pagalCommand };
