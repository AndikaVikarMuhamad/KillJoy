import fetch from "node-fetch";
import { extractImageThumb } from "@whiskeysockets/baileys";
import { doujinkudl, toPDF } from "../lib/scraper/index.mjs";

let handler = async (m, { conn, args }) => {
  if (!args[0]) throw "link chapter?";
  try {
    const data = await doujinkudl(args[0]);
    const imagepdf = await toPDF(data.img[0].images);
    const buffer = await (await fetch(data.img[0].images[0])).buffer();
    const jpegThumbnail = await extractImageThumb(buffer);
    await m.reply(
      "*Downloading...*\n\nJika terlalu lama mungkin filenya terlalu besar"
    );
    conn.sendMessage(
      m.chat,
      {
        document: imagepdf,
        jpegThumbnail,
        fileName: data.title + ".pdf",
        mimetype: "application/pdf",
      },
      { quoted: m }
    );
  } catch (err) {
    console.log(err.message);
    m.reply("tar di fix(kalo bisa)");
  }
};
handler.tags = ["downloader"];
handler.command = /^d(oujinkudl|dl)$/i;
handler.help = ["doujinkudl"];
export default handler;
