module.exports = {
  name: "toilet",
  description: "Funny command from PATHAN BOT",
  category: "fun",
  async run({ conn, m, args }) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const messages = ['🚽 Flushing user…', 'Loading... 99%... SPLASH!', 'You have been flushed by PATHAN BOT. Please dry yourself before continuing.'];
    for (const msg of messages) {
      await delay(2000);
      await conn.sendMessage(m.chat, { text: msg }, { quoted: m });
    }
  }
};
