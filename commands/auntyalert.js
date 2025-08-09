module.exports = {
  name: "auntyalert",
  description: "Funny command from IMRAN BOT",
  category: "fun",
  async run({ conn, m, args }) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const messages = ['⚠️ Desi Aunty detected nearby!', 'She’s judging you for existing.', 'Avoid: Talking loud, being single, or owning a cat.'];
    for (const msg of messages) {
      await delay(2000);
      await conn.sendMessage(m.chat, { text: msg }, { quoted: m });
    }
  }
};
