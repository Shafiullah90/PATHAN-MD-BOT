module.exports = {
  name: "alive",
  description: "Shows the bot is running",
  category: "info",
  async run({ conn, m }) {
    const text = `
🤖 *PATHAN BOT IS ALIVE!*

╭─〔 *Bot Status* 〕
├ 🔋 *Power:* ON
├ 📡 *Connection:* Stable
├ 👤 *Owner:* Shafiullah
├ 🌐 *GitHub:* github.com/Shafiullah90/Shafi-king-bot
╰─🛠️ *Made with love & code!*
    `;
    await conn.sendMessage(m.chat, { text }, { quoted: m });
  }
};
