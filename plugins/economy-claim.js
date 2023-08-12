let handler = async (m, { conn }) => {
  const exp = (db.data.users[m.sender].exp += 1000);
  const money = (db.data.users[m.sender].money += 100000);
  const limit = (db.data.users[m.sender].limit += 50);
  const idr = money.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  m.reply(
    `*Kamu Berhasil Claim Uang 10K , 1000 Exp & 50 Limit*\n\nSekarang kamu mempunyai\n*Limit :* ${limit}\n*Exp :* ${exp}\n*Uang :* ${idr}`
  );
};
// handler.tags = [''];
handler.command = /^claim$/i;
// handler.help = ['']
export default handler;
