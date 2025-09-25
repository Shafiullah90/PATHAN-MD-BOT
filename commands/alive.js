// commands/alive.js
const os = require('os');
const settings = require('../settings.js');

module.exports = {
  name: 'alive',
  alias: ['bot', 'online'],
  category: 'general',
  description: 'Check if bot is alive in stylish format 😎',
  
  lastUsed: {},

  async run({ conn, m, args }) {
    try {
      const chatId = m.chat;
      const sender = m.sender;

      if (!this.lastUsed[chatId]) this.lastUsed[chatId] = {};
      if (!this.lastUsed[chatId][sender]) this.lastUsed[chatId][sender] = 0;
      this.lastUsed[chatId][sender] += 1;

      const tagUser = sender.includes("@") ? "@" + sender.split("@")[0] : sender;

      // ⏱ Uptime
      let uptimeSec = process.uptime();
      let hours = Math.floor(uptimeSec / 3600);
      let minutes = Math.floor((uptimeSec % 3600) / 60);
      let seconds = Math.floor(uptimeSec % 60);
      let uptime = `${hours}h ${minutes}m ${seconds}s`;

      const aliveMsg = `
╔══✪〘 🤖 𝗣𝗔𝗧𝗛𝗔𝗡-𝗕𝗢𝗧 〙✪══
┃
┃   ✅ Bot is Alive & Running
┃   ⏱ Uptime: ${uptime}
┃   🗓 Date: ${new Date().toLocaleDateString()}
┃   🕒 Time: ${new Date().toLocaleTimeString()}
┃   👤 Requested by: ${tagUser}
┃
╚══════════════════╝
💖 Stay safe & enjoy!`;

      // Send image + styled message as one
      await conn.sendMessage(chatId, {
        image: { url: 'https://files.catbox.moe/o0nw0z.jpeg' }, // Your alive image
        caption: aliveMsg,
        mentions: [sender]
      }, { quoted: m });

    } catch (e) {
      console.error("❌ Alive command error:", e);
      await conn.sendMessage(m.chat, { text: "❌ Something went wrong while showing alive message." }, { quoted: m });
    }
  }
};
