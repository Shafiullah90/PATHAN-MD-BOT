// commands/whois.js
module.exports = {
  name: "whois",
  alias: ["userinfo", "id"],
  description: "Get information about a user",
  category: "info",

  async run({ conn, m }) {
    try {
      const target = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : m.sender);

      // Fetch user profile
      let ppUrl;
      try {
        ppUrl = await conn.profilePictureUrl(target, "image");
      } catch {
        ppUrl = "https://files.catbox.moe/o0nw0z.jpeg"; // fallback image
      }

      const contact = target.split("@")[0];
      let bio;
      try {
        bio = (await conn.fetchStatus(target)).status || "No bio set";
      } catch {
        bio = "No bio available";
      }

      const userInfo = `
👤 *User Information*
━━━━━━━━━━━━━━━━━━━
📛 *Name:* ${contact}
📱 *Number:* +${contact}
📄 *Bio:* ${bio}
🏷 *Tag:* @${contact}
━━━━━━━━━━━━━━━━━━━
⚡ Requested by: @${m.sender.split("@")[0]}
`;

      await conn.sendMessage(m.chat, {
        image: { url: ppUrl },
        caption: userInfo,
        mentions: [target, m.sender]
      }, { quoted: m });

    } catch (e) {
      console.error("❌ Whois command error:", e);
      await conn.sendMessage(m.chat, { text: "❌ Failed to fetch user info." }, { quoted: m });
    }
  }
};
