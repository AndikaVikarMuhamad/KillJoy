const items = {
  buy: {
    limit: {
      money: 100,
    },
    premium: {
      money: 2000,
    },
  },
  sell: {
    sampah: {
      money: 50,
    },
  },
};

let handler = async (m, { conn, command, args }) => {
  const user = db.data.users[m.sender];
  const item = (args[0] || "").toLowerCase();
  const listItems = Object.fromEntries(
    Object.entries(items[command.toLowerCase()]).filter(([v]) => v && v in user)
  );
  const money = user.money;
  const limit = user.limit;
  const total =
    Math.floor(
      isNumber(args[1])
        ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER)
        : 1
    ) * 1;
  if (!listItems[item]) throw "eleh";
  if (command.toLowerCase() == "buy") {
    const paymentMethod = Object.keys(listItems[item]).find((v) => v in user);
    user[paymentMethod] -= listItems[item][paymentMethod] * total;
    if (item == "premium") {
      // do smth
      user[item] = true;
      user[premiumDate] = new Date().getTime();
      m.reply("Done");
    } else {
      user[item] += total;
      m.reply(`*Sukses membeli ${item} sebanyak ${total}*`);
    }
  } else {
    // do smth
  }

  const b = 1;
  const idr = money.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  // m.reply("a");
};
// handler.tags = [''];
handler.command = /^buy$/i;
// handler.help = ['']
export default handler;
function isNumber(number) {
  if (!number) return number;
  number = parseInt(number);
  return typeof number == "number" && !isNaN(number);
}
