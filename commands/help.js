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
    await sock.sendMessage(chatId, { text: '_🔄 Loading PATHAN-BOT menu...please wait♻️_' }, { quoted: message });
    const end = Date.now();
    const ping = Math.round((end - start) / 2);
    const uptimeFormatted = formatTime(process.uptime());

    const helpMessage = `
┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃💻 PATHAN-BOT COMMAND MENU 💻
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
   📝 _Owner Information_
  ━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 *Owner:* ${settings.botOwner}
⏳ *Uptime:* ${uptimeFormatted}
🕐 *Time:* ${new Date().toLocaleString()}
⚡ *Speed:* ${ping}ms
🛠️ *Version:* ${settings.version}
┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃     🔒 _Owner Commands_
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
🔴 .ban | 🔵 .unban | 👑 .promote | 👥 .demote
🔕 .mute | 🔊 .unmute | 🗑️ .delete | 👋 .kick
⚠️ .warnings | ⚠️ .warn | 🚫 .antilink | 🚫 .antibadword
🧹 .clear | 👥 .tag | 👥 .tagall | 🤖 .chatbot
🔗 .resetlink | 👋 .welcome | 👋 .goodbye

┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃     🌐 _General Commands_
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
📜 .menu | 📶 .ping | ⏱️ .runtime | 🔊 .tts
👑 .owner | 😂 .joke | 💬 .quote | 🧠 .fact
🌦️ .weather | 📰 .news | 💌 .attp | 🎵 .lyrics
🎱 .8ball | ℹ️ .groupinfo | 👮 .admins | 🔍 .jid
📸 .ss | 🌍 .trt | 📞 .vv

┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃    ⚙️ _Settings Commands_
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
🌐 .public | 🔐 .private | 🟢 .autostatus
📖 .autoread | 🧹 .clearsession | 🛡️ .antidelete
🧼 .cleartmp | 💬 .autoreact | 🖼️ .getpp | 📸 .setpp
📜 .autobio | ⌨️ .autotyping | 🎙️ .autorecording

┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃     🎨 _Sticker Commands_
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
🌀 .blur | 🖼️ .simage | 🌟 .sticker | 🐯 .tgsticker
🤣 .meme | 🎯 .take | 🔀 .emojimix

┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃     🎮 _Game Commands_
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
❌⭕ .tictactoe | 🎯 .hangman | ❓ .guess
🧠 .trivia | ✍️ .answer | 🤐 .truth | 😈 .dare

┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃     🧠 _AI & Search_
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
🤖 .gpt | 💡 .gptgo | 🧬 .gemini | 🧠 .flux
🎨 .imagine

┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃     🎭 _Fun Commands_
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
💘 .compliment | 😡 .insult | 😍 .flirt
📜 .shayari | 🌙 .goodnight | 🌹 .roseday
🎭 .character | ☠️ .wasted | 🚢 .ship
😈 .simp | 🤪 .stupid | 🧠 .brainwash | 🐔 .detect
👻 .ghost | 🧠 .mindread | 💩 .toilet | 📞 .callmom
💘 .crush | 🪞 .mirror | 🛐 .auntyalert | 💣 
 .explode
 | 🔓 .unhack | 🕵️ .spy
💨 .bombgas | 🛏️ .bedrate | 🤰 .pregnancycheck
💘 .lovecheck | 🌈 .gaycheck | 🏳️‍🌈 .gaydetector
🔥 .hornycheck | 😻 .pussylover

┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃      🧰 _Maker Menu_
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
🔥 .fire | ⚡ .thunder | ❄️ .ice | 🌫️ .snow
👹 .devil | 💜 .purple | 💡 .light | 💻 .matrix
🎬 .arena | 👾 .hacker | 🌿 .leaves | 💥 .glitch
🌌 .metallic | 🖤 .blackpink | ✨ .neon | 🚫 .1917
🎭 .impressive | 🏖️ .sand

┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃   🔍 _Search & Download_
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
🎵 .play | 🎶 .song | 🎥 .video
📸 .instagram |
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

    try {
        const imagePath = path.join(__dirname, '../assets/june_repo.jpg');
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
                        newsletterName: 'IMRAN BOT',
                        serverMessageId: -1
                    }
                }
            }, { quoted: message });

            // Send menu.mp3
            if (fs.existsSync(audioPath)) {
                const audioBuffer = fs.readFileSync(audioPath);
                await sock.sendMessage(chatId, {
                    audio: audioBuffer,
                    mimetype: 'audio/mp4',
                    ptt: true
                }, { quoted: message });
            } else {
                console.warn('⚠️ menu.mp3 not found in assets.');
            }

            // Send audio3.mp3
            if (fs.existsSync(audio3Path)) {
                const audio3Buffer = fs.readFileSync(audio3Path);
                await sock.sendMessage(chatId, {
                    audio: audio3Buffer,
                    mimetype: 'audio/mp4',
                    ptt: true
                }, { quoted: message });
            } else {
                console.warn('⚠️ audio3.mp3 not found in assets.');
            }

        } else {
            console.error('⚠️ Bot image not found at:', imagePath);
            await sock.sendMessage(chatId, {
                text: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363403266464072@newsletter',
                        newsletterName: 'IMRAN BOT',
                        serverMessageId: -1
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage });
    }
}

module.exports = helpCommand;
