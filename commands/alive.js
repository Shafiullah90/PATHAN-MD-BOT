// commands/alive.js
const os = require('os');
const settings = require('../settings.js');

module.exports = {
  name: 'alive',
  alias: ['bot', 'online'],
  category: 'general',
  description: 'Check if bot is alive in stylish format 😍✨',
  
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

      // 📅 Afghanistan Date & Time
      const dateAfghanistan = new Date().toLocaleDateString("en-GB", { timeZone: "Asia/Kabul" });
      const timeAfghanistan = new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kabul" });

      // 💻 System Info
      const platform = os.platform();
      const arch = os.arch();
      const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1); // in GB
      const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(1);   // in GB

      const aliveMsg = `
🌸━━━━━━━━━━━━━━━━━━━🌸
      ✨ 𝗣𝗔𝗧𝗛𝗔𝗡-𝗕𝗢𝗧 ✨
🌸━━━━━━━━━━━━━━━━━━━🌸

💖 *Hello ${tagUser},*
I’m alive, active & ready to serve you 😍✨

⏱ *Uptime:* ${uptime}  
🗓 *Date:* ${dateAfghanistan}  
🕒 *Time:* ${timeAfghanistan}  
👤 Requested by: ${tagUser}
💻 *System Info:*  
🔹 OS: ${platform} (${arch})  
🔹 RAM: ${freeMem}GB free / ${totalMem}GB total  

🤖 *Bot Status:* Online ✅  
🌟 *Version:* 1.0.0  

💌 Stay safe, stay happy, and keep smiling 🌷🌸  
━━━━━━━━━━━━━━━━━━━━━━━
⚡ Powered by: *Pathan-Bot*
🌸━━━━━━━━━━━━━━━━━━━🌸`;

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
