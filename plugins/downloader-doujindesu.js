import axios from "axios";
import { extractImageThumb } from "@adiwajshing/baileys";
import { doujindesudl, toPDF } from "../lib/scraper/index.mjs";

let handler = async (m, { conn, args }) => {
  if (!args[0]) throw "link chapter?";
  try {
    const data = await doujindesudl(args[0]);
    const imagepdf = await toPDF(data.img, {
      headers: {
        Referer: "https://doujindesu.tv/",
      },
    });
    const buffer = await axios.get(data.img[0], {
      headers: {
        Referer: "https://doujindesu.tv/",
      },
      responseType: "arraybuffer",
    });
    const jpegThumbnail = await extractImageThumb(buffer.data);
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
handler.command = /^d(oujindesudl|esudl)$/i;
handler.help = ["doujinkudl"];
export default handler;
