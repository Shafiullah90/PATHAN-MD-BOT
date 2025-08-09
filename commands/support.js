module.exports = {
  name: "support",
  alias: ["helpbot", "support", "imransupport"],
  description: "Get IMRAN BOT support links and contact info",
  category: "general",
  async run({ conn, m }) {
    const caption = `🛠️ *IMRAN BOT - SUPPORT CENTER* 🛠️

📣 *Official Channel:*  
https://whatsapp.com/channel/0029VbAoVt0Bqbr1vsgafC3r

💬 *WhatsApp Support Group:*  
https://chat.whatsapp.com/GPIsXLbnQFZ0tRmHJWQZkQ?mode=ac_t

📲 *Telegram Support:*  
https://t.me/imrankhanbe

🧑‍💻 *GitHub Repository:*  
https://github.com/ahmadtech12/IMRAN-BOT

📞 *Bot Admin:*  
wa.me/923461575994

📞 *Bot Owner:*  
wa.me/923414344575

🧠 Use *.menu* to explore commands.
💥 Stay updated and have fun using IMRAN BOT!`;

    await conn.sendMessage(m.chat, {
      text: caption,
      mentions: [m.sender]
    }, { quoted: m });
  }
};
