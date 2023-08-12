import axios from "axios";
import { pickrandom } from "./../lib/scraper/index.mjs";
let tags = {};

let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  const a = await axios.get("https://type.fit/api/quotes");
  const quotes = pickrandom(a.data);
  const defaultMenu = {
    before: `%readmore`,
    header: "*%category*",
    body: "• %cmd %islimit %isPremium",
    footer: "",
    after: `*Quotes of the day*\n"${quotes.text}"\nBy:${quotes.author}`,
  };
  try {
    let name = m.pushName || conn.getName(m.sender);
    let d = new Date(new Date() + 3600000);
    let locale = "id";
    let date = d.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    });
    let time = d.toLocaleTimeString(locale, { timeZone: "Asia/Jakarta" });
    time = time.replace(/[.]/g, ":");
    let _uptime;
    if (process.send) {
      process.send("uptime");
      _uptime =
        (await new Promise((resolve) => {
          process.once("message", resolve);
          setTimeout(resolve, 1000);
        })) * 1000;
    }
    let uptime = clockString(_uptime);
    let help = Object.values(global.plugins)
      .filter((plugin) => !plugin.disabled)
      .map((plugin) => {
        return {
          help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
          tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
          prefix: "customPrefix" in plugin,
          limit: plugin.limit,
          premium: plugin.premium,
          enabled: !plugin.disabled,
        };
      });

    let groups = Object.keys(await conn.groupFetchAllParticipating());
    let chats = Object.keys(await conn.chats);
    let block = await conn.fetchBlocklist();
    let judul = `*${ucapan()} ${conn.getName(m.sender)}*

*INFO BOT*
•> Aktif selama ${uptime}
•> *${groups.length}* Grup
•> *${Math.max(chats.length - groups.length, 0)}* Chat Pribadi
•> *${Object.keys(global.db.data.users).length}* Pengguna
•> ${block == undefined ? "*0* Diblokir" : "*" + block.length + "* Diblokir"}
•> *${
      Object.entries(global.db.data.chats).filter((chat) => chat[1].isBanned)
        .length
    }* Chat Terbanned
•> *${
      Object.entries(global.db.data.users).filter((user) => user[1].banned)
        .length
    }* Pengguna Terbanned`;

    for (let plugin of help)
      if (plugin && "tags" in plugin)
        for (let tag of plugin.tags) if (!(tag in tags) && tag) tags[tag] = tag;
    conn.menu = conn.menu ? conn.menu : {};
    let before = conn.menu.before || defaultMenu.before;
    let header = conn.menu.header || defaultMenu.header;
    let body = conn.menu.body || defaultMenu.body;
    let footer = conn.menu.footer || defaultMenu.footer;
    let after = conn.menu.after || defaultMenu.after;
    let _text = [
      before,
      ...Object.keys(tags).map((tag) => {
        return (
          header.replace(/%category/g, tags[tag].toUpperCase()) +
          "\n" +
          [
            ...help
              .filter(
                (menu) => menu.tags && menu.tags.includes(tag) && menu.help
              )
              .map((menu) => {
                return menu.help
                  .map((help) => {
                    return body
                      .replace(/%cmd/g, menu.prefix ? help : "%p" + help)
                      .replace(/%islimit/g, menu.limit ? "Ⓛ" : "")
                      .replace(/%isPremium/g, menu.premium ? "Ⓟ" : "")
                      .trim();
                  })
                  .join("\n");
              }),
            footer,
          ].join("\n")
        );
      }),
      after,
    ].join("\n");
    let text =
      typeof conn.menu == "string"
        ? conn.menu
        : typeof conn.menu == "object"
        ? _text
        : "";
    let replace = {
      "%": "%",
      p: _p,
      uptime,
      me: conn.getName(conn.user.jid),
      name,
      date,
      time,
      readmore: readMore,
    };

    text = text.replace(
      new RegExp(
        `%(${Object.keys(replace).sort((a, b) => b.length - a.length)
          .join`|`})`,
        "g"
      ),
      (_, name) => "" + replace[name]
    );
    conn.sendThumb(
      m.chat,
      `${judul}\n\n${text.trim()}`,
      "hehe",
      "test",
      "https://i.pinimg.com/564x/14/d8/84/14d8848cea97b9528734e0d500e6a0ae.jpg",
      "HHHH",
      m
    );
  } catch (err) {
    m.reply("An error occurred");
    throw err;
  }
};
handler.help = ["menu"];
handler.tags = ["main"];
handler.command = /^(m|menu|help|\?)$/i;
export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}

function ucapan() {
  const date = new Date();
  const hour_now = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(date);
  let ucapanWaktu = "Ohayou...";
  if (hour_now >= "03" && hour_now <= "10") {
    ucapanWaktu = "Ohayou...";
  } else if (hour_now >= "10" && hour_now <= "15") {
    ucapanWaktu = "Konnichiwa...";
  } else if (hour_now >= "15" && hour_now <= "17") {
    ucapanWaktu = "Konnichiwa...";
  } else if (hour_now >= "17" && hour_now <= "18") {
    ucapanWaktu = "Konbanwa...";
  } else if (hour_now >= "18" && hour_now <= "23") {
    ucapanWaktu = "Konbanwa...";
  } else {
    ucapanWaktu = "Konbanwa";
  }
  return ucapanWaktu;
}
