module.exports = {
  name: "mirror",
  description: "Funny command from IMRAN BOT",
  category: "fun",
  async run({ conn, m, args }) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const messages = ['Accessing front camera...', '📸 Mirror result: You look like 99% stress + 1% battery 🔋', 'Smile... no wait, never mind 😬'];
    for (const msg of messages) {
      await delay(2000);
      await conn.sendMessage(m.chat, { text: msg }, { quoted: m });
    }
  }
};
