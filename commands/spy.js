// File: commands/spy.js

module.exports = {
  name: "spy",
  alias: ["spy", "spyon", "imranspy"],
  description: "Pretend to spy on someone (funny prank)",
  category: "fun",
  async run({ conn, m, args }) {
    const target = args.join(" ") || "Unknown Person";
    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    const logs = [
      `🛰️ Connecting to secret satellites...`,
      `📡 Hacking ${target}'s camera...`,
      `📸 Capturing live image...`,
      `🎙️ Activating microphone...`,
      `👂 Listening: “Bro stop spying on me 😠”`,
      `📍 Location: Behind You 👀`,
      `💾 Downloading: embarrassing_selfies.zip`,
      `🤖 IMRAN BOT is watching... 😈`
    ];

    const ending = [
      `🤣 JUST KIDDING!`,
      `😳 You were spying on your own face!`,
      `💡 Tip: Next time, at least *pretend* to be FBI 😂`,
      `👻 IMRAN BOT logs everything... but only for fun.`
    ];

    await conn.sendMessage(m.chat, {
      text: `🕵️‍♂️ Spying on *${target}*...`,
    }, { quoted: m });

    for (let line of logs) {
      await delay(2500);
      await conn.sendMessage(m.chat, { text: line }, { quoted: m });
    }

    await delay(3000);
    for (let line of ending) {
      await delay(2000);
      await conn.sendMessage(m.chat, { text: line }, { quoted: m });
    }
  }
};
