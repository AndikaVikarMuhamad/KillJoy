import { konachan } from "../lib/scraper/index.mjs";

let handler = async (m, { conn, text }) => {
  if (!text) throw "Nyari apa nyet??\n contoh : .konachan anime";
  try {
    const result = await konachan(text);
    conn.sendFile(m.chat, result.high_res, "", text, m);
  } catch (err) {
    m.reply("Emror");
    console.log(err.message);
  }
};
handler.help = ["konachan"];
handler.tags = ["internet"];
handler.command = /^(konachan)$/i;
export default handler;
