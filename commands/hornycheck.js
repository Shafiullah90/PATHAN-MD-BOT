module.exports = {
  name: "hornycheck",
  alias: ["hornyrate", "howhorny"],
  description: "Detect how horny someone is 😈",
  category: "fun",
  async run({ conn, m }) {
    const target =
      m.mentionedJid[0] ||
      (m.quoted ? m.quoted.sender : m.sender);

    const level = Math.floor(Math.random() * 101);
    const scale = "💦".repeat(Math.floor(level / 10)) || "😐";

    const notes = [
      "🥵 Someone control this beast!",
      "😳 Calm down bro...",
      "🧊 Get this one some ice!",
      "😂 Not even 1% loyal",
      "😇 Innocent face, devil inside",
    ];

    const reply = `🔞 *HORNY LEVEL ANALYZER* 🔞\n\n💦 Target: @${target.split("@")[0]}\n🔥 Horny Rate: *${level}%*\n${scale}\n\n_${notes[Math.floor(Math.random() * notes.length)]}_`;

    await conn.sendMessage(m.chat, { text: reply, mentions: [target] }, { quoted: m });
  },
};
