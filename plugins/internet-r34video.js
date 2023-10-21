import { r34video } from "../lib/scraper/index.mjs";

let handler = async (m, { conn, text }) => {
  if (!text) throw "linknya apa nyet??\ncontoh: .r34vid milf";
  try {
    const result = await r34video(text);
    conn.sendFile(m.chat, result.link, result.title, result.desc, m);
  } catch (err) {
    console.log(err.message);
    m.reply("tar di fix(kalo bisa)");
  }
};
handler.tags = ["internet"];
handler.command = /^r(ule)?34vid(eo)?$/i;
handler.help = ["rule34video"];
handler.alias = ["r34videodl", "rule34vidodl"];

export default handler;
