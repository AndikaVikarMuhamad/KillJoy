import { r34videodl } from "../lib/scraper/index.mjs";

let handler = async (m, { conn, args }) => {
  if (!args[0])
    throw "linknya apa nyet??\ncontoh: .r34viddl https://rule34video.com/videos/3051243/mrs-edwards-loves-thick-college-cock/";
  try {
    const result = await r34videodl(args[0]);
    conn.sendFile(m.chat, result.link, result.title, result.desc, m);
  } catch (err) {
    console.log(err.message);
    m.reply("tar di fix(kalo bisa)");
  }
};
handler.tags = ["internet"];
handler.command = /^r(ule)?34vid(eo)?dl$/i;
handler.help = ["rule34videodl"];
handler.alias = ["r34videodl", "rule34vidodl"];

export default handler;
