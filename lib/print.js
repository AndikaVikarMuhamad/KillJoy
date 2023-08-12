import PhoneNumber from "awesome-phonenumber";
import chalk from "chalk";
import { watchFile } from "fs";
const urlRegex = (await import("url-regex-safe")).default({ strict: false });

export default async function (m, conn = { user: {} }) {
  let _name = await conn.getName(m.sender);
  // const pfp = await conn
  //   .profilePictureUrl(m.sender, "image")
  //   .catch((_) => "https://i.imgur.com/tt3q2RC.jpg");
  // db.data.users[m.sender].pfp = pfp;

  let sender =
    PhoneNumber("+" + m.sender.replace("@s.whatsapp.net", "")).getNumber(
      "international"
    ) + (_name ? " ~" + _name : "");
  let chat = await conn.getName(m.chat);

  console.log(
    `${chalk.cyanBright("Message From")} : ${chalk.cyan(
      sender
    )}\n${chalk.magenta("To")} : ${chalk.magentaBright(
      m.chat + (chat ? " ~" + chat : "")
    )}\n${chalk.yellow("Message Type")} : ${chalk.yellowBright(
      m.mtype
        ? m.mtype
            .replace(/message$/i, "")
            .replace("audio", m.msg.ptt ? "PTT" : "audio")
            .replace(/^./, (v) => v.toUpperCase())
        : ""
    )}
    `.trim()
  );
  if (typeof m.text === "string" && m.text) {
    let log = m.text.replace(/\u200e+/g, "");
    let mdRegex =
      /(?<=(?:^|[\s\n])\S?)(?:([*_~])(.+?)\1|```((?:.||[\n\r])+?)```)(?=\S?(?:[\s\n]|$))/g;
    let mdFormat =
      (depth = 4) =>
      (_, type, text, monospace) => {
        let types = {
          _: "italic",
          "*": "bold",
          "~": "strikethrough",
        };
        text = text || monospace;
        let formatted =
          !types[type] || depth < 1
            ? text
            : chalk[types[type]](text.replace(mdRegex, mdFormat(depth - 1)));
        // console.log({ depth, type, formatted, text, monospace }, formatted)
        return formatted;
      };
    if (log.length < 4096)
      log = log.replace(urlRegex, (url, i, text) => {
        let end = url.length + i;
        return i === 0 ||
          end === text.length ||
          (/^\s$/.test(text[end]) && /^\s$/.test(text[i - 1]))
          ? chalk.blueBright(url)
          : url;
      });
    log = log.replace(mdRegex, mdFormat(4));
    if (m.mentionedJid)
      for (let user of m.mentionedJid)
        log = log.replace(
          "@" + user.split`@`[0],
          chalk.blueBright("@" + (await conn.getName(user)))
        );
    console.log(
      m.error != null ? chalk.red(log) : m.isCommand ? chalk.yellow(log) : log
    );
  }
  if (m.messageStubParameters)
    console.log(
      m.messageStubParameters
        .map((jid) => {
          jid = conn.decodeJid(jid);
          let name = conn.getName(jid);
          return chalk.redBright(
            PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber(
              "international"
            ) + (name ? " ~" + name : "")
          );
        })
        .join(", ")
    );
  if (/document/i.test(m.mtype))
    console.log(`📄 ${m.msg.fileName || m.msg.displayName || "Document"}`);
  else if (/ContactsArray/i.test(m.mtype)) console.log(`👨‍👩‍👧‍👦 ${" " || ""}`);
  else if (/contact/i.test(m.mtype))
    console.log(`👨 ${m.msg.displayName || ""}`);
  else if (/audio/i.test(m.mtype)) {
    const duration = m.msg.seconds;
    console.log(
      `${m.msg.ptt ? "🎤 (PTT " : "🎵 ("}AUDIO) ${Math.floor(duration / 60)
        .toString()
        .padStart(2, 0)}:${(duration % 60).toString().padStart(2, 0)}`
    );
  }

  console.log();
  // if (m.quoted) console.log(m.msg.contextInfo)
}

let file = global.__filename(import.meta.url);
watchFile(file, () => {
  console.log(chalk.redBright("Update 'lib/print.js'"));
});
