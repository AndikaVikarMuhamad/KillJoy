import { r34 } from "../lib/scraper/index.mjs";

let handler = async (m, { conn, text }) => {
  if (!text) throw "Nyari apa nyet??\ncontoh: .r34 furry";
  try {
    const result = await r34(text);
    conn.sendFile(m.chat, result.img, "", result.upload_by, m);
  } catch (err) {
    m.reply("Emror\nPeriksa kembali tags");
    console.log(err.message);
  }
};
handler.help = ["rule34"];
handler.tags = ["internet"];
handler.alias = ["r34", "rule34"];
handler.command = /^(r((ule)?34))$/i;
export default handler;
