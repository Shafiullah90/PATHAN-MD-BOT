module.exports = {
  name: "pussylover",
  alias: ["cataddict", "catlover", "meowboy"],
  description: "Reveal the ultimate pussy lover in the group 🐱",
  category: "fun",
  async run({ conn, m }) {
    const target =
      m.mentionedJid[0] || (m.quoted ? m.quoted.sender : m.sender);

    const userTag = `@${target.split('@')[0]}`;

    const captions = [
      `🌹 *CONFESSION LETTER FROM IMRAN BOT* 🌹

Dear ${userTag},

Every time a cat meows, I feel like it's your soul calling mine. 🐱
Your love for pussies has reached cosmic levels.

You don’t chase women... you chase cats across rooftops at midnight. 🌒

Your Google history:
🔍 "How to marry a cat"
🔍 "Is meowing romantic?"

Conclusion: You are *THE LEGENDARY PUSSY LOVER*. 😼❤️`,

      `😻 *WARNING! EXTREME PUSSY ADDICTION DETECTED!* 😻

Subject: ${userTag}

🧪 Symptoms:
• Sleeps with cat pillows
• Meows in dreams
• Sends cat reels at 3 AM

💌 Diagnosis:
*Hopelessly, endlessly, romantically in love with pussy.*

Prescribed treatment:
1 dose of *meow therapy* every 2 hours. 🐾`,

      `📢 *BREAKING NEWS:* ${userTag} spotted kneeling before a cat altar lighting candles.

Reason?
"Because only she understands me," he whispered while stroking a Siamese.

💖 Status: *Emotionally unavailable – loyal to pussies only*. 🐱💘`
    ];

    const selected = captions[Math.floor(Math.random() * captions.length)];

    await conn.sendMessage(m.chat, {
      text: selected,
      mentions: [target]
    }, { quoted: m });
  },
};
