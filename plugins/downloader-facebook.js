import { facebook } from "../lib/scraper/index.mjs";

let handler = async (m, { conn, args }) => {
  if (!args[0]) throw `Masukan *URL*`;

  try {
    const result = await facebook(args[0]);
    conn.sendFile(m.chat, result.link, "", "", m);
  } catch (err) {
    console.log(err.message);
    m.reply("tar di fix(kalo bisa)");
  }
};
handler.tags = ["downloader"];
// handler.command = /^fb?()?dl$/i;
handler.command = /^f((ace)?b(ook)?(dl)?)$/i;
handler.help = ["facebook"];
export default handler;
