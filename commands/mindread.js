const mindReads = [
  "*🧠 Reading your mind... please wait...* 💭",
  "*PATHAN-MD BOT* detected some deep thoughts 👁️✨",

  "You smile in public, but sometimes hide your sadness inside 😔💔.",
  "You think a lot before sleeping — about people, memories, and what-ifs 🌙.",
  "You pretend you don’t care, but deep down you really do 🫶.",
  "Someone special still lives in your heart, even if you act like you’ve moved on 💞.",
  "You love peace more than arguments 😌🌿.",
  
  "*🔮 Your thoughts are clearer now... scanning further...*",
  "You enjoy late-night talks more than early-morning greetings 🌃.",
  "Sometimes you re-read old chats and smile or get emotional 😅💭.",
  "You secretly wish someone texted you first today 📱❤️.",
  "You often help others, even when you’re the one needing help 🥺.",
  "You love music because it says what you can’t put into words 🎶💫.",

  "*🧘 Energy level rising... PATHAN-MD reading deeper...*",
  "You love rain, it gives peace to your soul 🌧️💖.",
  "You act strong, but inside you just want someone to understand you 🥹.",
  "You’re not lazy — your mind just gets tired of overthinking 🧩.",
  "You forgive easily, but never forget 💭.",
  "You’ve lost someone you still wish to talk to 💔.",

  "*💫 Final reading detected...*",
  "You want to travel and see the world one day 🌍✨.",
  "You want love, but also peace — not drama 💌.",
  "You’re the type who remembers tiny details about people 💬💞.",
  "You sometimes feel no one truly gets you, but you still keep smiling 😊.",
  "You’re not cold — you’ve just been hurt before ❄️💔."
];

let lastMindIndex = 0;

module.exports = {
  name: "mindread",
  description: "🧠 Reads the replied user's mind using PATHAN-MD's deep AI magic ✨",
  category: "fun",
  
  async run({ conn, m }) {
    if (!m.isGroup) {
      return await conn.sendMessage(m.chat, {
        text: "❌ This command only works in *groups*! 🌍"
      }, { quoted: m });
    }

    const target = m.quoted?.sender;
    if (!target) {
      return await conn.sendMessage(m.chat, {
        text: "❗ Please *reply* to a user's message to read their mind 🧠✨"
      }, { quoted: m });
    }

    const tagUser = `@${target.split("@")[0]}`;
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const linesToSend = mindReads.slice(lastMindIndex, lastMindIndex + 5);
    if (linesToSend.length < 5) {
      const remaining = 5 - linesToSend.length;
      linesToSend.push(...mindReads.slice(0, remaining));
    }

    lastMindIndex = (lastMindIndex + 5) % mindReads.length;

    for (const line of linesToSend) {
      await delay(2000);
      await conn.sendMessage(m.chat, {
        text: `${tagUser}, ${line}`,
        mentions: [target]
      }, { quoted: m });
    }
  }
};
