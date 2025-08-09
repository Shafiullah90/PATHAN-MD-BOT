/**
 * PATHAN BOT - WhatsApp Bot Utilities
 * 
 * 🔰 Powered by Baileys Library
 * 🔧 Utilities: File upload (Telegraph, Uguu, Ezgif), WebP to MP4 converter, etc.
 * 
 * Copyright (c) 2024 Imran Hacks
 * Licensed under the MIT License
 */

const axios = require('axios');
const BodyForm = require('form-data');
const { fromBuffer } = require('file-type');
const fetch = require('node-fetch');
const fs = require('fs');
const cheerio = require('cheerio');

/**
 * Upload image or video to Telegra.ph
 * @param {string} Path - File path
 * @returns {Promise<string>} - URL of uploaded media
 */
function TelegraPh(Path) {
    return new Promise(async (resolve, reject) => {
        if (!fs.existsSync(Path)) return reject(new Error("❌ File not found"));

        try {
            const form = new BodyForm();
            form.append("file", fs.createReadStream(Path));

            const { data } = await axios({
                url: "https://telegra.ph/upload",
                method: "POST",
                headers: form.getHeaders(),
                data: form
            });

            resolve("https://telegra.ph" + data[0].src);
        } catch (err) {
            reject(new Error("❌ Telegra.ph Upload Failed: " + err.message));
        }
    });
}

/**
 * Upload any file to uguu.se
 * @param {string} input - File path
 * @returns {Promise<string>} - URL of uploaded file
 */
async function UploadFileUgu(input) {
    return new Promise(async (resolve, reject) => {
        const form = new BodyForm();
        form.append("files[]", fs.createReadStream(input));

        try {
            const { data } = await axios({
                url: "https://uguu.se/upload.php",
                method: "POST",
                headers: {
                    "User-Agent": "Mozilla/5.0",
                    ...form.getHeaders()
                },
                data: form
            });

            resolve(data.files[0]);
        } catch (err) {
            reject(new Error("❌ Uguu Upload Failed: " + err.message));
        }
    });
}

/**
 * Convert WebP file to MP4 using ezgif
 * @param {string} path - WebP file path
 * @returns {Promise<{ status: boolean, result: string }>}
 */
function webp2mp4File(path) {
    return new Promise((resolve, reject) => {
        const form = new BodyForm();
        form.append('new-image-url', '');
        form.append('new-image', fs.createReadStream(path));

        axios.post('https://s6.ezgif.com/webp-to-mp4', form, {
            headers: form.getHeaders()
        }).then(({ data }) => {
            const $ = cheerio.load(data);
            const file = $('input[name="file"]').val();

            const form2 = new BodyForm();
            form2.append('file', file);
            form2.append('convert', 'Convert WebP to MP4!');

            axios.post(`https://ezgif.com/webp-to-mp4/${file}`, form2, {
                headers: form2.getHeaders()
            }).then(({ data }) => {
                const $ = cheerio.load(data);
                const result = 'https:' + $('div#output > p.outfile > video > source').attr('src');
                resolve({
                    status: true,
                    message: "✅ Converted by PATHAN-BOT",
                    result
                });
            }).catch(reject);
        }).catch(reject);
    });
}

/**
 * Upload media to floNime
 * @param {Buffer} medianya - Buffer of file
 * @param {object} options - Optional config
 * @returns {Promise<object>} - Upload result
 */
async function floNime(medianya, options = {}) {
    const { ext } = await fromBuffer(medianya) || options.ext;

    const form = new BodyForm();
    form.append('file', medianya, `tmp.${ext}`);

    const response = await fetch('https://flonime.my.id/upload', {
        method: 'POST',
        body: form
    });

    return await response.json();
}

module.exports = {
    TelegraPh,
    UploadFileUgu,
    webp2mp4File,
    floNime
};
