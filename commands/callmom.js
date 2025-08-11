module.exports = {
  name: "callmom",
  description: "Funny command from PATHAN BOT",
  category: "fun",
  async run({ conn, m, args }) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    
const messages = [
  '📞 *Incoming Call: Mom is Calling...*',
  '👩‍👦 *Mom:* "Son, what you doing on WhatsApp still ?"',
  '🫣 *You:* "just time pass, mom..."',
  '📵 *Mom:* "Time pass or secret girlfriend? 😏"',
  '💀 *Bot:* You just got exposed by your *own PATHAN BOT* — in 4K.'
];

    for (const msg of messages) {
      await delay(2000);
      await conn.sendMessage(m.chat, { text: msg }, { quoted: m });
    }
  }
};
