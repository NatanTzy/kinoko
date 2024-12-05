/*
 * Creator: Zaenishi
 * WhatsApp: +62 831-8822-9366
 * Instagram: @zaenishi
 * Twitter: @zaenishi
 * GitHub: zaenishi
 *
 * Jangan sungkan untuk menghubungi saya jika ada masalah pada script ini!
 */

import { exec } from "child_process";
import color from "./color.js";
import setting from "../setting.js";
import { format } from "util";
import fs from "fs";
import axios from "axios";

export default async (m, sock, db, func, color, util) => {
  try {
    const message = m.body || m.type;
    const sender = m.sender;
    const isGroup = m.key.remoteJid.endsWith("@g.us");
    const isCreator = m.sender.split("@")[0].includes(setting.owner);

    if (message) {
      console.log("\n" + color.blue("╭" + "─".repeat(50)));
      console.log(color.cyan("PESAN MASUK"));
      console.log(
        color.yellow(`Dari   : ${isGroup ? "Group" : "Private"} | ${sender}`),
      );
      console.log(color.yellow(`Pesan: "${message}"`));
      console.log(color.blue("╰" + "─".repeat(50)));
    }

    const prefixMatch = message.match(/^[!./](\w+)(?:\s+([\s\S]*))?/);

    const command =
      prefixMatch && prefixMatch[1] ? prefixMatch[1].toLowerCase() : "";
    const args = prefixMatch && prefixMatch[2] ? prefixMatch[2].split(" ") : [];

    /* Menu System */
    const script = fs.readFileSync("./system/cmd.js", "utf-8");
    const categoryRegex = /\/\/ category: ([\w\s,]+)$/gm;
    const commandRegex = /case ["'](.+?)["']:/g;
    const categories = {};
    let currentCategories = [];

    for (const line of script.split("\n")) {
      const categoryMatch = categoryRegex.exec(line);
      const commandMatch = commandRegex.exec(line);

      if (categoryMatch) {
        currentCategories = categoryMatch[1]
          .split(",")
          .map((c) => c.trim().toUpperCase());
      }

      if (commandMatch) {
        currentCategories.forEach((category) => {
          if (!categories[category]) categories[category] = [];
          categories[category].push(commandMatch[1]);
        });
      }
    }

    if (["menu", "help"].includes(command)) {
      let menuText = `Script Ini Menggunakan Base *https://github.com/zaenishi/kinoko*\n\n`;

      for (const [category, commands] of Object.entries(categories)) {
        menuText += `*ー ${category}*\n`;
        commands.forEach((cmd, i) => {
          menuText += `${i + 1}. *!${cmd}*\n`;
        });
        menuText += "\n";
      }

      menuText = menuText.trim();

      await sock.reply(
        m.key.remoteJid,
        {
          text: menuText,
          contextInfo: {
            externalAdReply: {
              showAdAttribution: true,
              title: "Kinoko Komori - Beta 🍄",
              body: "Dibuat dengan ❤️ oleh zaenishi",
              thumbnailUrl: "",
              mediaType: 1,
            },
          },
        },
        { quoted: m },
      );
    }

    switch (command) {
      // category: MAIN
      case "ping":
        sock.reply(m.key.remoteJid, { text: "Pong!" }, { quoted: m });
        break;
        
      // category: CREDITS, MAIN
      case "credits":
        const creditsText = `*ー CREDITS*
- Amirul (https://github.com/amiruldev20)
- Zaenishi (https://github.com/zaenishi)
- WhiskeySockets (https://github.com/WhiskeySockets)`;
        sock.reply(m.key.remoteJid, { text: creditsText }, { quoted: m });
      break;
      
      // category: SCRIPT, MAIN
      case "sc": case "script":
        const scriptText = `*ー SCRIPT*
Script ini didapat di *https://github.com/zaenishi/kinoko* jangan lupa bintangnya! ✨
- 100% gratis!`;
        sock.reply(m.key.remoteJid, { text: scriptText }, { quoted: m });
      break;
      
      default:
       if (message.startsWith(">")) {
          if (!isCreator) return m.reply("Anda tidak memiliki izin untuk menggunakan perintah ini.");
        
          let kode = message.trim().slice(1);
          let teks;
        
          try {
            teks = await eval(`(async () => { ${kode} })()`);
          } catch (e) {
            teks = `Error: ${e.message}`;
          } finally {
            await m.reply(format(teks));
          }
        }
        
        if (message.startsWith("$")) {
          if (!isCreator) return m.reply("Anda tidak memiliki izin untuk menggunakan perintah ini.");
          exec(message.trim().slice(1), (err, stdout) => {
            if (err) return m.reply(`${err}`);
            if (stdout) return m.reply(stdout);
          });
        }
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    await sock.reply(setting.owner + "@s.whatsapp.net", {
      text: format(error),
    });
  }
};