module.exports = {
  name: "callmom",
  description: "Funny command from IMRAN BOT",
  category: "fun",
  async run({ conn, m, args }) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const messages = ['📞 Incoming call from Ammi...', '‘Beta, kya kar rahe ho WhatsApp pe?’', '💀 You just got exposed by your own bot.'];
    for (const msg of messages) {
      await delay(2000);
      await conn.sendMessage(m.chat, { text: msg }, { quoted: m });
    }
  }
};
