import { extractImageThumb } from "@adiwajshing/baileys";
import { komikudl, toPDF } from "../lib/scraper/index.mjs";
import fetch from "node-fetch";

let handler = async (m, { conn, args }) => {
  if (!args[0]) throw "link chapter?";
  try {
    const data = await komikudl(args[0]);

    const imagepdf = await toPDF(data.img);
    const buffer = await (await fetch(data.img[0])).buffer();
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
handler.command = /^komik(u)?dl$/i;
handler.help = ["komikudl"];
export default handler;
