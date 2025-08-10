module.exports = {
  name: "callmom",
  description: "Funny command from PATHAN BOT",
  category: "fun",
  async run({ conn, m, args }) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    Here’s a more meaningful, stylish, and extended version of that line with added humor and a natural vibe:
    
const messages = [
  '📞 *Incoming Call: Mom is Calling...*',
  '👩‍👦 *Mom:* "Son, what you doing on WhatsApp still ?"',
  '🫣 *You:* "just time pass, mom..."',
  '📵 *Mom:* "Time pass or secret girlfriend? 😏"',
  '💀 *Bot:* You just got exposed by your *own PATHAN BOT* — in 4K.'
];

You can change "Ammi" to "Mom" or "Mother" based on the tone you want. Let me know if you want a Pashto or Urdu version too.
    for (const msg of messages) {
      await delay(2000);
      await conn.sendMessage(m.chat, { text: msg }, { quoted: m });
    }
  }
};
