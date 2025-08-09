const delay = (ms) => new Promise(res => setTimeout(res, ms));

module.exports = {
  name: "fartblasttext",
  alias: ["fartanim", "gasbomb", "fartline"],
  description: "Weird animated fart roast for the tagged user",
  category: "fun",
  async run({ conn, m }) {
    // Try to detect target from mention, reply, or fallback to sender
    const mention = m.mentionedJid?.[0];
    const replyUser = m.quoted?.sender || m.quoted?.participant;
    const sender = m.sender;

    // Priority: tag > reply > sender
    const target = mention || replyUser || sender;
    const tag = "@" + target.split("@")[0];

    if (!target || target === sender) {
      return conn.sendMessage(m.chat, {
        text: "💨 *Tag or reply to someone* to drop a fart bomb on them!",
      }, { quoted: m });
    }

    const animation = [
      "😐",
      "😐💨",
      "😐💨💨",
      "😐💨💨💨",
      "😐💨💨💨💨",
      "🤔 *What's that smell...?*",
      "😵‍💫 *Oh no... it's happening...*",
      "💣💨💥 *EXPLOSIVE FART DETONATED!*",
      "🥵💀 Oxygen levels dropping...",
      "🧼 *Deploying emergency sanitizer...*"
    ];

    const finalRoasts = [
      `💩 ${tag} farted so hard, Google Maps rerouted people around them.`,
      `🧠 ${tag}'s fart unlocked ancient memories in everyone’s DNA.`,
      `☢️ ${tag}'s fart made the Avengers retire.`,
      `🧻 ${tag}'s fart echo triggered car alarms in 3 cities.`,
      `💀 ${tag}'s butt just committed an unspeakable war crime.`,
      `🦠 Scientists are now studying ${tag}'s fart as a new virus strain.`,
      `🕳️ A black hole opened from ${tag}'s rear end.`,
      `🔥 NASA mistook ${tag}'s fart for an asteroid strike.`,
      `📴 Everyone’s WiFi disconnected after ${tag}'s fart shockwave.`,
      `🎬 Netflix is making a documentary on ${tag}'s fart.`,
      `🧼 Air fresheners gave up and resigned.`,
    ];

    for (let line of animation) {
      await conn.sendMessage(m.chat, {
        text: line,
        mentions: [target],
      }, { quoted: m });
      await delay(700);
    }

    // Send final roast
    const roast = finalRoasts[Math.floor(Math.random() * finalRoasts.length)];
    await conn.sendMessage(m.chat, {
      text: roast,
      mentions: [target],
    }, { quoted: m });

    // Bot branding
    await conn.sendMessage(m.chat, {
      text: `💨 *Fart mission complete.*\n🤖 *Powered by IMRAN BOT*`,
      mentions: [target],
    }, { quoted: m });
  }
};
