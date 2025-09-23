module.exports = {
  name: "support",
  alias: ["helpbot", "support", "pathanupport"],
  description: "Get PATHAN BOT support links and contact info",
  category: "general",
  async run({ conn, m }) {
    const caption = `🛠️ *PATHAN BOT - SUPPORT CENTER* 🛠️



💬 *WhatsApp Support Group:*  
https://chat.whatsapp.com/JvIe71GfSU9IYDBO8YRsDu?mode=ac_t

📲 *Telegram Support:*  
https://t.me/@Shafipath

🧑‍💻 *GitHub Repository:*  
https://github.com/Shafiullah90/king-bot

📞 *Bot Admin:*  
wa.me/93703802176

📞 *Bot Owner:*  
wa.me/93703802176

🧠 Use *.menu* to explore commands.
💥 Stay updated and have fun using PATHAN BOT!`;

    await conn.sendMessage(m.chat, {
      text: caption,
      mentions: [m.sender]
    }, { quoted: m });
  }
};
