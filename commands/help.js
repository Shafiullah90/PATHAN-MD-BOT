const settings = require('../settings');
const fs = require('fs');
const path = require('path');

function formatTime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= (24 * 60 * 60);
    const hours = Math.floor(seconds / (60 * 60));
    seconds %= (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    let time = '';
    if (days > 0) time += `${days}d `;
    if (hours > 0) time += `${hours}h `;
    if (minutes > 0) time += `${minutes}m `;
    if (seconds > 0 || time === '') time += `${seconds}s`;

    return time.trim();
}

async function helpCommand(sock, chatId, message) {
    const start = Date.now();
    await sock.sendMessage(chatId, { text: '⏳ *Loading sweet PATHAN-BOT menu...* ♻️' }, { quoted: message });
    const end = Date.now();
    const ping = Math.round((end - start) / 2);
    const uptimeFormatted = formatTime(process.uptime());

    const helpMessage = `

━━━━━━━━━━━━━━━━━┓
┃🇦🇫 💻 PATHAN BOT MENU 💻🇦🇫
┗━━━━━━━━━━━━━━━━━┛

📝 *Owner Information*
━━━━━━━━━━━━━━━━━━
📍 Owner: ${settings.botOwner}
⏳ Uptime: ${uptimeFormatted}
🕐 Time: ${new Date().toLocaleString()}
⚡ Speed: ${ping}

✨ *OWNER COMMANDS* ✨
━━━━━━━━━━━━━━━━━━
🔴 .ban <@user>
🔵 .unban <@user>
✅ .sudo <@user>
❌ .delsudo <@user>
👑 .promote <@user>
👥 .demote <@user>
👋 .kick <@user>
🗑️ .delete <msg>
🚫 .antilink on/off
🚫 .antibadword on/off
👥 .tag <msg>
👥 .tagall
🤖 .chatbot on/off
🔗 .resetlink
👋 .welcome on/off
👋 .goodbye on/off

🌍 *GENERAL COMMANDS* 🌍
━━━━━━━━━━━━━━━━━━
📜 .menu
📶 .ping
⏱️ .runtime
👑 .owner
😂 .joke
💬 .quote
🧠 .fact
🌦️ .weather
📰 .news
💌 .attp <text>
🎵 .lyrics <song>
🎱 .8ball <question>
ℹ️ .groupinfo
👮 .admins
🔍 .jid <number>
📸 .ss <url>
🌍 .trt <text>
📞 .vv <url>

⚙️ *SETTINGS* ⚙️
━━━━━━━━━━━━━━━━━━
🌐 .public
🔐 .private
🟢 .autostatus on/off
📖 .autoread on/off
🧹 .clearsession
🛡️ .antidelete on/off
💬 .autoreact on/off
🖼️ .getpp <@user>
📸 .setpp <image>
📜 .autobio <text>
⌨️ .autotyping on/off
🎙️ .autorecording on/off

🎨 *STICKERS* 🎨
━━━━━━━━━━━━━━━━━━
🌀 .blur <image>
🖼️ .simage <image>
🌟 .sticker <image/video>
🐯 .tgsticker <image/video>
🤣 .meme
🎯 .take <sticker>
🔀 .emojimix <emoji1+emoji2>

🎶 *DOWNLOAD* 🎶
━━━━━━━━━━━━━━━━━━
▶️ .play <song>
🎥 .video <name/url>
🎵 .song <name>
📥 .ytmp3 <url>
📥 .ytmp4 <url>
▶️ .fb <url>

🎮 *GAMES* 🎮
━━━━━━━━━━━━━━━━━━
❌⭕ .tictactoe
🎯 .hangman
❓ .guess
🧠 .trivia
✍️ .answer
🤐 .truth
😈 .dare

🤖 *AI & SEARCH* 🤖
━━━━━━━━━━━━━━━━━━
🤖 .gpt <text>
💡 .gptgo <text>
🧬 .gemini <text>
🧠 .flux <text>
🎨 .imagine <prompt>

🎭 *FUN ZONE* 🎭
━━━━━━━━━━━━━━━━━━
💘 .compliment <@user>
😡 .insult <@user>
😍 .flirt <@user>
💋 .kiss <@user>
📜 .shayari
🌙 .goodnight
🌹 .roseday
🎭 .character
☠️ .wasted
🚢 .ship <@user1+@user2>
😈 .simp <@user>
🤪 .stupid <@user>
🧠 .brainwash <@user>
🐔 .detect <@user>
👻 .ghost <@user>
🧠 .mindread <@user>
💩 .toilet <@user>
📞 .callmom
💘 .crush <@user>
🪞 .mirror <@user>
💣 .explode <@user>
🕵️ .spy <@user>
💨 .bombgas <@user>
🛏️ .bedrate <@user>
🤰 .pregnancycheck <@user>
💘 .lovecheck <@user>
🌈 .gaycheck <@user>
🔥 .hornycheck <@user>
👑 .shafi

🧰 *MAKER* 🧰
━━━━━━━━━━━━━━━━━━
🔥 .fire <text>
⚡ .thunder <text>
❄️ .ice <text>
🌫️ .snow <text>
👹 .devil <text>
💜 .purple <text>
💡 .light <text>

🚀 *SYSTEM* 🚀
━━━━━━━━━━━━━━━━━━
🔄 .update



`;

    try {
        const imagePath = path.join(__dirname, '../assets/menu_image.jpg');
        const audioPath = path.join(__dirname, '../assets/menu.mp3');
        const audio3Path = path.join(__dirname, '../assets/audio3.mp3');

        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363403266464072@newsletter',
                        newsletterName: settings.botName,
                        serverMessageId: -1
                    }
                }
            }, { quoted: message });

            if (fs.existsSync(audioPath)) {
                const audioBuffer = fs.readFileSync(audioPath);
                await sock.sendMessage(chatId, {
                    audio: audioBuffer,
                    mimetype: 'audio/mp4',
                    ptt: true
                }, { quoted: message });
            }

            if (fs.existsSync(audio3Path)) {
                const audio3Buffer = fs.readFileSync(audio3Path);
                await sock.sendMessage(chatId, {
                    audio: audio3Buffer,
                    mimetype: 'audio/mp4',
                    ptt: true
                }, { quoted: message });
            }

        } else {
            await sock.sendMessage(chatId, { text: helpMessage });
        }
    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage });
    }
}

module.exports = helpCommand;
