module.exports = {
  name: "mindread",
  description: "Funny command from IMRAN BOT",
  category: "fun",
  async run({ conn, m, args }) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const messages = ['Reading your mind...', "You are thinking: 'Why is this bot so funny?'", 'Also: You secretly love pineapple pizza 🍍🍕. Eww.'];
    for (const msg of messages) {
      await delay(2000);
      await conn.sendMessage(m.chat, { text: msg }, { quoted: m });
    }
  }
};
