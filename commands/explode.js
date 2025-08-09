module.exports = {
  name: "explode",
  description: "Funny command from IMRAN BOT",
  category: "fun",
  async run({ conn, m, args }) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const messages = ['💥 Warning: System overload detected!', '⚠️ 3... 2... 1...', 'BOOM! Just your hopes and dreams exploded 😎'];
    for (const msg of messages) {
      await delay(2000);
      await conn.sendMessage(m.chat, { text: msg }, { quoted: m });
    }
  }
};
