const fs = require("fs-extra");
const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  downloadContentFromMessage,
  makeInMemoryStore,
} = require("@whiskeysockets/baileys");
const pino = require("pino");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Jakarta").locale("id");
const { Sticker } = require("wa-sticker-formatter");
const figlet = require("figlet");
const request = require("request");
const chalk = require("chalk");
var similarity = require("similarity");
const toMs = require("ms");
const ms = require("parse-ms");
const { spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const CFonts = require("cfonts");
const FormData = require("form-data");
const Math_js = require("mathjs");
const axios = require("axios");
const { exec } = require("child_process");
const util = require("util");
const speed = require("performance-now");
let package = require("./package.json");
const cd = 4.32e7;
const canvas = require("canvacord");
require("dotenv").config();

//////////////////Database/////////////////////////
const setting = JSON.parse(fs.readFileSync("./settings/setting.json"));
const welcome = JSON.parse(fs.readFileSync("./settings/welcome.json"));
const updatealbot = JSON.parse(fs.readFileSync("./settings/update.json"));
const user = JSON.parse(fs.readFileSync("./settings/user.json"));
const daftar = JSON.parse(fs.readFileSync("./settings/daftar.json"));
const _sewa = JSON.parse(fs.readFileSync("./settings/sewa.json"));

//////////////////DATABASE GAME////////////////////
const tebakgambar = JSON.parse(fs.readFileSync("./datagame/tebakgambar.json"));
const datatg = JSON.parse(fs.readFileSync("./datagame/datatg.json"));
const _point = JSON.parse(fs.readFileSync("./datagame/point.json"));
const teka = JSON.parse(fs.readFileSync("./datagame/tekateki.json"));
const jwb = JSON.parse(fs.readFileSync("./datagame/jawaban.json"));
const allkuis = JSON.parse(fs.readFileSync("./datagame/kuis.json"));
//////////////////Baimleys/////////////////////////

const storeFilePath = "./baileys_store.json";

const store = makeInMemoryStore({
  logger: pino().child({ level: "silent", stream: "store" }),
});

store?.readFromFile(storeFilePath);

setInterval(() => {
  store.writeToFile(storeFilePath);
}, 15_000);

const { time, info } = require("console");

global.getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const color = (text, color) => {
  return !color ? chalk.red(text) : chalk.keyword(color)(text);
};

CFonts.say("Deswita Bot", {
  colors: ["#f2aa4c"],
  font: "block",
  align: "center",
});

CFonts.say(`'${package.name}' Oleh @${package.author.name || package.author}`, {
  colors: ["#f2aa4c"],
  font: "console",
  align: "center",
});

const { menuId } = require("./lib");

const threshold = 0.72;

let { ownerNumber, apikey, prefix } = setting;

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth");
  __path = process.cwd();

  const getGroupAdmins = (participants) => {
    admins = ["6283878761652@s.whatsapp.net"];
    for (let i of participants) {
      i.admin === "admin" || i.admin === "superadmin" ? admins.push(i.id) : "";
    }
    return admins;
  };

  const get = (from, _dir) => {
    let position = null;
    Object.keys(_dir).forEach((i) => {
      if (_dir[i].id === from) {
        position = i;
      }
    });
    if (position !== null) {
      return position;
    }
  };

  const checkgroup = (userId, _dir) => {
    let status = false;
    Object.keys(_dir).forEach((i) => {
      if (_dir[i].id === userId) {
        status = true;
      }
    });
    return status;
  };


  const checkteks = (userId, _dir) => {
    let position = null;
    Object.keys(_dir).forEach((i) => {
      if (_dir[i].id === userId) {
        position = i;
      }
    });
    if (position !== null) {
      return _dir[position].text;
    }
  };

  const conn = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: true,
    auth: state,
    getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id);
        return msg?.message || undefined;
      }
      return {
        conversation: "hello",
      };
    },
  });

  conn.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "connecting") {
      console.log(color("[~>>]"), color("Connecting...", "green"));
    } else if (connection === "open") {
      console.log(color("[OWNER]"), color("Deswita is now online!", "yellow"));
      console.log(color("[~>>]"), color("BOT Started!", "green"));
    } else if (connection === "close") {
      lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
        ? start()
        : console.log(color("[OWNER]"), color("Koneksi Terputus", "red"));
    }
  });

  conn.ev.on("messages.upsert", async (chatUpdate) => {
    try {
      m = chatUpdate;
      m = m.messages[0];
      if (!m.message) return;
      if (m.key.fromMe) return;
      const content = JSON.stringify(m.message);
      m.message =
        Object.keys(m.message)[0] === "ephemeralMessage"
          ? m.message.ephemeralMessage.message
          : m.message;
      const from = m.key.remoteJid;
      const isGroup = from.endsWith("@g.us");
      const botNumber = conn.user.id
        ? conn.user.id.split(":")[0] + "@s.whatsapp.net"
        : conn.user.id;
      const type = Object.keys(m.message)[0];
      const time = moment.tz("Asia/Jakarta").format("DD/MM HH:mm:ss");
      const body =
        type === "conversation" && m.message.conversation.startsWith(prefix)
          ? m.message.conversation
          : type == "imageMessage" &&
            m.message.imageMessage.caption.startsWith(prefix)
          ? m.message.imageMessage.caption
          : type == "videoMessage" &&
            m.message.videoMessage.caption.startsWith(prefix)
          ? m.message.videoMessage.caption
          : type == "extendedTextMessage" &&
            m.message.extendedTextMessage.text.startsWith(prefix)
          ? m.message.extendedTextMessage.text
          : "";
      const budy =
        type === "conversation"
          ? m.message.conversation
          : type === "extendedTextMessage"
          ? m.message.extendedTextMessage.text
          : "";
      const budi =
        type === "conversation"
          ? m.message.conversation
          : type === "imageMessage" &&
            m.message.imageMessage.caption.startsWith(prefix)
          ? m.message.imageMessage.caption
          : "";
      const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
      const groupMetadata = isGroup ? await conn.groupMetadata(from) : "";
      const groupMembers = isGroup ? await groupMetadata.participants : "";
      const groupName = isGroup ? groupMetadata.subject : "";
      const groupAdmins = isGroup ? await getGroupAdmins(groupMembers) : "";
      const participants = isGroup ? await groupMetadata.participants : "";
      const isBotGroupAdmins = isGroup
        ? groupAdmins.includes(botNumber)
        : false;
      const sender = isGroup ? m.key.participant : m.key.remoteJid;
      const isGroupAdmins = isGroup
        ? groupAdmins.includes(sender) ||
          from === "6283878761652@s.whatsapp.net"
        : false;
      const args = body.trim().split(/ +/).slice(1);
      const isCmd = body.startsWith(prefix);
      const isMedia = type === "imageMessage" || type === "videoMessage";
      const q = args.join(" ");
      const isQuotedImage =
        type === "extendedTextMessage" && content.includes("imageMessage");
      const isQuotedVideo =
        type === "extendedTextMessage" && content.includes("videoMessage");
      const isQuotedAudio =
        type === "extendedTextMessage" && content.includes("audioMessage");
      const isQuotedSticker =
        type === "extendedTextMessage" && content.includes("stickerMessage");
      const isWelcome = checkgroup(from, welcome);
      const isDaftar = daftar.includes(from);
      const isUser= user.includes(from)
      const isOwnerBot = ownerNumber.includes(sender);
      const cr1 = "6283878761652@s.whatsapp.net";
      const pushname = 'piyo'

      const reply = (text) => {
        conn.sendMessage(from, {
          text: text,
        });
      };

      const fakegroup = async (teks) => {
        conn.sendMessage(
          from,
          { text: teks },
          {
            quoted: {
              key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(from ? { remoteJid: "6281414046576-1627831139@g.us" } : {}),
              },
              message: {
                imageMessage: {
                  url: "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                  mimetype: "image/jpeg",
                  caption: "albot",
                  fileSha256: "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                  fileLength: "28777",
                  height: 1080,
                  width: 1079,
                  mediaKey: "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                  fileEncSha256: "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                  directPath:
                    "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                  mediaKeyTimestamp: "1610993486",
                  jpegThumbnail: fs.readFileSync(`./lib/cewepiyo.jpg`),
                  scansSidecar:
                    "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw==",
                },
              },
            },
            contextInfo: { forwardingScore: 999, isForwarded: true },
            sendEphemeral: true,
          }
        );
      };

      const parseMention = (text = "") => {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(
          (v) => v[1] + "@s.whatsapp.net"
        );
      };

      const sendTextWithmentions = (teks, member, id) => {
        id == null || id == undefined || id == false
          ? conn.sendMessage(from, {
              text: teks.trim(),
              mentions: [member],
            })
          : conn.sendMessage(
              from,
              { text: teks.trim(), mentions: [member] },
              { quoted: m }
            );
      };

      const isUrl = (url) => {
        return url.match(
          new RegExp(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi
          )
        );
      };

      const vcard =
        "BEGIN:VCARD\n" + // metadata of the contact card
        "VERSION:3.0\n" +
        "FN:Alvio🖤\n" + // full name
        "ORG:Owner Bot;\n" + // the organization of the contact
        "TEL;type=CELL;type=VOICE;waid=:+6283878761652\n" + // WhatsApp ID + phone number
        "END:VCARD";

      // LOG
      if (isCmd && !isGroup)
        console.log(
          chalk.yellow("[EXEC] ") +
            time +
            chalk.green(" " + prefix + command) +
            " FROM " +
            chalk.green(pushname)
        );
      if (isCmd && isGroup)
        console.log(
          chalk.yellow("[EXEC] ") +
            time +
            chalk.green(" " + prefix + command) +
            " FROM " +
            chalk.green(pushname) +
            " IN " +
            chalk.green(groupName)
        );

        console.log(m)

        if (
          body == "." ||
          body == "lazada" ||
          body === "tagall" ||
          body == ".dor" ||
          body == ".light" ||
          body == "Tagall" ||
          body === "TagAll"
        ) {
          if (isGroup && isGroupAdmins) {
            teks = args.length > 1 ? body.slice(8).trim() : "";
            teks += `  Total : ${groupMembers.length}\n`;
            for (let mem of groupMembers) {
              teks += `╠➥ @${mem.id.split("@")[0]}\n`;
            }
            conn.sendMessage(from, {
              text:
                "╔══✪〘 Mention All 〙✪══\n╠➥" + teks + `╚═〘 ${groupName} 〙`,
              mentions: participants.map((a) => a.id),
            });
          }
        }
  
        if (body === "!anti") {
          if (!isGroupAdmins) return;
          const per = m;
          const pe = JSON.parse(fs.readFileSync("anti.json"));
          if (pe.includes(from)) {
            let tep = pe.indexOf(from);
            pe.splice(tep, 1);
            fs.writeFileSync("anti.json", JSON.stringify(pe));
            return conn.sendMessage(
              from,
              { text: "Sukses Matikan Shield Groupp" },
              { quoted: per }
            );
          }
          pe.push(from);
          fs.writeFileSync("anti.json", JSON.stringify(pe));
          conn.sendMessage(
            from,
            { text: "Sukses Aktifkan Shield Group" },
            { quoted: per }
          );
        }
  
        if (body == "speed") {
          const timestampi = speed();
          const latensip = speed() - timestampi;
          conn.sendMessage(from, { text: `${latensip.toFixed(4)} Second` });
        }
  
        if (body == "halo") {
          if (isGroup && isGroupAdmins) {
            var options = {
              text: "halo semua",
              mentions: participants.map((a) => a.id),
            };
            conn.sendMessage(from, options);
          }
        }
        if (body == "halo2") {
          if (isGroup && isGroupAdmins) {
            var options = {
              text: "jajan yuk gais",
              mentions: participants.map((a) => a.id),
            };
            conn.sendMessage(from, options);
          }
        }
  
        if (body == "haechan" || body === "bestie" || body === "cilukba") {
          if (isGroup && isGroupAdmins) {
            conn.sendPresenceUpdate("composing", from);
            ini_buffer = await fs.readFileSync("haechan.webp");
            conn.sendMessage(from, {
              sticker: ini_buffer,
              mentions: participants.map((a) => a.id),
            });
          }
        } else if (body == "Piyak" || body == "piyak" || body === ".piw") {
          if (isGroup && isGroupAdmins) {
            conn.sendPresenceUpdate("composing", from);
            ini_buffer = await fs.readFileSync("2.webp");
            conn.sendMessage(from, {
              sticker: ini_buffer,
              mentions: participants.map((a) => a.id),
            });
          }
        }
  
        if (body === "hidetag" || body === "`") {
          if (!isGroup) return reply("Harus Di Grup");
          if (!isGroupAdmins) return;
          var opsi = {
            text: "",
            mentions: participants.map((a) => a.id),
          };
          conn.sendMessage(from, opsi);
        }

      switch (command) {
        /////////////////////////////////////////SYSTEM///////////////////////////////

        case "tag":
          if (!isGroup) return reply("Harus Di Grup");
          if (!isGroupAdmins) return;
          var options = {
            text: q,
            mentions: participants.map((a) => a.id),
          };
          conn.sendMessage(from, options);
          break;

        case "menu":
          let query = q
          if (query) {
            switch (query) {
              case '1':
                await fakegroup(menuId.menusystem(pushname));
                break;
              case '2':
                await fakegroup(menuId.menumedia(pushname));
                break;
              case '3':
                await fakegroup(menuId.menutools(pushname));
                break;
              case '4':
                return reply("Menu Ini Masih Dalam Tahap Pengembangan")
                await fakegroup(menuId.menuanime(pushname));
                break;
              case '5':
                return reply("Menu Ini Masih Dalam Tahap Pengembangan")
                await fakegroup(menuId.menueto(pushname));
                break;
              case '6':
                return reply("Menu Ini Masih Dalam Tahap Pengembangan")
                await fakegroup(menuId.menusticker(pushname));
                break;
              case '7':
                await fakegroup(menuId.menudownloader(pushname));
                break;
              case '8':
                return reply("Menu Ini Masih Dalam Tahap Pengembangan")
                await fakegroup(menuId.menulogo(pushname));
                break;
              case '9':
                return reply("Menu Ini Masih Dalam Tahap Pengembangan")
                await fakegroup(menuId.menugame(pushname));
                break;
              case '10':
                return reply("Menu Ini Masih Dalam Tahap Pengembangan")
                await fakegroup(menuId.menugrup(pushname));
                break;
              default:
                reply('Menu Tidak Di Temukan')
                break;
            }
          } else  {
          await fakegroup(menuId.listmenu(pushname));
          }
          sleep(2000).then(() => {
            !isUser ? fakegroup(menuId.tutor()) : null;
            user.push(from);
            fs.writeFileSync("./settings/user.json", JSON.stringify(user));
          });
          break;

        case "ping":
          reply('pong')
        break;

        case "ownerbot":
          await conn.sendMessage(from, {contacts: {displayName: 'Alvio Owner Bot', contacts:[{ vcard : vcard}]}})
        break;

        /////////////////////////////////////////MEDIA///////////////////////////////

        case "igstalk":
            
        break;
          
      }
    } catch (err) {
      console.log(err.message);
    }
  });

  conn.ev.on("creds.update", saveCreds);

  store.bind(conn.ev);

  conn.ev.on("group-participants.update", async (mem) => {
    const gp = JSON.parse(fs.readFileSync("welcome.json"));
    isGroup = mem.id.endsWith("@g.us");
    if (checkgroup(mem.id, gp) === true) {
      if (mem.action == "add") {
        const teks2 = await checkteks(mem.id, gp);
        await conn.sendMessage(mem.id, { text: teks2 });
      }
    }
  });
}

start();
