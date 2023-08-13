let handler = async (m, { conn }) => {
  try {
    m.reply("helo");
  } catch (err) {
    console.log(err.message);
    m.reply("tar di fix(kalo bisa)");
  }
};
handler.tags = ["downloader"];
// handler.command = /^fb?()?dl$/i;
handler.command = /^f((ace)?b(ook)?(dl)?)$/i;
handler.help = [""];
export default handler;
