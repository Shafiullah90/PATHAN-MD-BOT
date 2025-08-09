// File: commands/hack.js

module.exports = {
  name: "imranhack",
  alias: ["imranhack", "ihack", "hacktarget"],
  description: "Simulate a terrifying 2-minute hacking sequence with funny twist",
  category: "fun",
  async run({ conn, m, args }) {
    const target = args.join(" ") || "Target Device";
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    
    const steps = [
      `🔍 [BOOT] HackTool v13.9 launching...`,
      `🧠 Target locked: ${target}`,
      `🔌 Establishing quantum tunnel over 16.9Tbps fiber...`,
      `🔐 Breaking SSL encryption layer [██████████] 99.9%`,
      `📶 Hijacking mobile signal...`,
      `📟 Injecting worm [Code: Z3r0Day.69]`,
      `💾 Downloading data from ${target}'s phone memory...`,
      `📂 camera_roll.zip | system32.dll | secret_mms.tar.gz`,
      `📸 Capturing live webcam footage...`,
      `🎙️ Recording mic: “Hello? Who’s there??” 😱`,
      `📡 IP traced: 39.42.XXX.XXX - SHANGLA`,
      `🛠 Deploying Rootkit-Nuke...`,
      `💣 Critical files deleted: system32, heart.exe, TikTok.db`,
      `🧨 Self-destruct protocol initiated...`,
      `☣️ FBI Warning: This action violates federal law...`,
      `⚠️ Notifying: NSA, ISI, CIA, FIA, PTA, BBC, MTV`,
      `🚔 Police drone deployed to your house`,
      `🔴 RED ALERT: 12 satellites now tracking you`,
      `📵 All your contacts have been added to “Hack Victims 2025” group`,
      `☠️ SYSTEM OVERRIDE COMPLETE — Target owned by ImranBot`
    ];

    const funnyTwist = [
      `🤣 Wait wait wait...`,
      `📴 Just kidding!`,
      `🧠 You’ve been hacked by... your own imagination 😂`,
      `🎉 This was just a prank from *IMRAN BOT* 🤖`,
      `🪞 Next time, don’t trust commands that sound like “hack” 😈`,
      `💬 Go ahead and prank someone else using *.imranhack* 😎`,
      `📢 Share the laugh — but don’t forget to *breathe again* 😵‍💫`
    ];

    await conn.sendMessage(m.chat, {
      text: `🧠 Initiating top-level hack on *${target}*\n⏳ Duration: ~2 minutes\n⚠️ Stay calm. We are watching...`,
    }, { quoted: m });

    for (let i = 0; i < steps.length; i++) {
      await delay(3500);
      await conn.sendMessage(m.chat, { text: steps[i] }, { quoted: m });
    }

    await delay(3000);
    for (let line of funnyTwist) {
      await delay(2500);
      await conn.sendMessage(m.chat, { text: line }, { quoted: m });
    }
  }
};
