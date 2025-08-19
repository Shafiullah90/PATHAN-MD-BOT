// commands/alive.js
const os = require("os");

module.exports = {
    name: 'alive',
    alias: ['bot', 'online'],
    category: 'general',
    desc: 'Check if bot is alive',
    async run({ conn, m, args }) {
        try {
            // ✅ Safe extraction
            const sender = m.key?.participant || m.key?.remoteJid || "unknown";
            const chatId = m.key?.remoteJid;
            const tagUser = sender.includes("@") ? "@" + sender.split("@")[0] : sender;

            // 🕒 Uptime calculation
            let uptimeSec = process.uptime();
            let hours = Math.floor(uptimeSec / 3600);
            let minutes = Math.floor((uptimeSec % 3600) / 60);
            let seconds = Math.floor(uptimeSec % 60);
            let uptime = `${hours}h ${minutes}m ${seconds}s`;

            const aliveMsg = `
╔══✪〘 PATHAN-𝗕𝗢𝗧 〙✪══
┃
┃   ✅ Bot is Alive & Running
┃   ⏱️ Uptime: ${uptime}
┃   👤 Requested by: ${tagUser}
┃
╚══════════════════╝
            `;

            await conn.sendMessage(chatId, { 
                text: aliveMsg, 
                mentions: [sender] 
            }, { quoted: m });

        } catch (e) {
            console.error("Error in alive command:", e);
            await conn.sendMessage(m.key.remoteJid, { text: "❌ Something went wrong in alive command." }, { quoted: m });
        }
    }
};
