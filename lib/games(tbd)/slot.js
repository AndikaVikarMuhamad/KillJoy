import fs from "fs";

const a = async (bet, nick, pick) => {
  const c = fs.readFileSync("a.json");
  if (c.length == 0) {
    fs.writeFileSync(
      "a.json",
      JSON.stringify({
        bank: {
          value: 1,
          change: 1,
          money: 10000000,
        },
        nasabah: {},
      })
    );
  } else {
    let data = c ? JSON.parse(c) : {};
    if (data.nasabah[nick] == undefined) {
      data.nasabah[nick] = {
        ...data[nick || {}],
        money: 100000000,
      };
    }
    let money = data.nasabah[nick].money;
    let value = data.bank.value;
    let change = data.bank.change;
    let bandar = data.bank.money;
    let ini = Math.floor(Math.random() * (101 - change));
    if (change >= 100) {
      ini = pick;
    }
    console.log(ini);
    if (bet > money) {
      console.log("kamu miskin");
    } else {
      if (pick == ini) {
        if (bandar > 0 && bandar > bet) {
          money += bet * value;
          bandar -= bet * value;
          console.log(
            `selamat kamu dapet duit sebesar ${
              bet * value
            }\nduit kamu sekarang adalah : ${money}`
          );
          value = 1;
          change = 1;
        } else if (bandar < bet && bandar > 0) {
          money += bandar;
          bandar = 0;
          change = 1;
          value = 1;
          console.log(
            `selamat kamu dapet duit sebesar ${bandar}\nduit kamu sekarang adalah : ${money}\n\nnb:karena duit bandar abis jadi kasih segitu dulu`
          );
        } else {
          console.log("bandar rungkad");
        }
      } else {
        value += bet / 12312;
        change += bet / 1234;
        money -= bet;
        bandar += bet;
        console.log(
          `selamat kamu rugi duit sebesar ${bet}\nduit kamu sekarang adalah : ${money}\n\nPrize pool : Bet X ${value.toFixed(
            2
          )}\nTips : ${
            change >= 100
              ? "dah 100% menang nih"
              : `tebak angka antara 1-${
                  100 - Math.floor(change)
                }\nKesempatan menang : ${change.toFixed(2)}%`
          }`
        );
      }

      {
        data.bank = {
          ...data["bank" || {}],
          value,
          change,
          money: bandar,
        };
        data.nasabah[nick] = {
          ...data[nick || {}],
          money,
        };
      }
    }
    await console.log(money, value, bandar);
    fs.writeFileSync("a.json", JSON.stringify(data));
  }
};

const ap = (bet, nick, pick) => {
  const database = fs.readFileSync("gacor.json");

  if (database.length == 0) {
    fs.writeFileSync(
      "gacor.json",
      JSON.stringify({
        bank: {
          money: 0,
          multiplier: 1,
        },
        algortima: {
          bangkrut: 80,
          rungkad: 40,
          gacor: 2,
          max_win: 0.5,
        },
        pemain: {},
      })
    );
  } else {
    let datas = database ? JSON.parse(database) : {};
    let bangkrut_rate = datas.algortima.bangkrut;
    let rungkad_rate = datas.algortima.rungkad;
    let gacor_rate = datas.algortima.gacor;
    let max_win_rate = datas.algortima.max_win;
    let Bangkrut = bangkrut_rate * 100;
    let Rungkad = Bangkrut + rungkad_rate * 100;
    let Gacor = Rungkad + gacor_rate * 100;
    let Max_win = Gacor + max_win_rate * 100;
    // console.log(Bangkrut, Rungkad, Gacor, Max_win);
    let range =
      bangkrut_rate * 100 +
      rungkad_rate * 100 +
      gacor_rate * 100 +
      max_win_rate * 100;
    let rate = Math.floor(Math.random() * range);
    let hasil = [];

    if (datas.pemain[nick] == undefined) {
      datas.pemain[nick] = {
        ...datas[nick || {}],
        money: 100000,
      };
    }
    let money = datas.pemain[nick].money;
    if (bet > money) {
      console.log("kamu miskin");
    } else {
      let bandar = datas.bank.money;
      let multiplier = datas.bank.multiplier;
      // Max win
      if (Gacor < rate && rate <= Max_win) {
        if (bandar > 0 && bandar > bet * multiplier) {
          max_win_rate = 5;
          money += bet * multiplier;
          bandar -= bet * multiplier;
          hasil.push("kamu dapet MAX WIN +" + (bet * multiplier).toFixed(2));
          multiplier = 1;
        } else if (bandar > 0 && bandar < bet * multiplier) {
          max_win_rate = 5;
          money += bet * multiplier;
          hasil.push("kamu dapet MAX WIN +" + bandar.toFixed(2));
          bandar = 0;
          multiplier = 1;
        } else if (bandar <= 0) {
          hasil.push("bandar bangkrut 1");
        }
      }
      // Gacor
      else if (Rungkad < rate && rate <= Gacor) {
        if (bandar > 0 && bandar > bet * multiplier) {
          max_win_rate += 1;
          gacor_rate = 10;
          money += (bet * multiplier) / 2;
          bandar -= (bet * multiplier) / 2;
          hasil.push("kamu dapet GACOR +" + (bet * multiplier) / 2);
          multiplier += 0.1;
        } else if (bandar > 0 && bandar < bet * multiplier) {
          max_win_rate = 5;
          money += bet * multiplier;
          hasil.push(
            "Bandarnya rungkad jir\nkamu dapet GACOR +" + bandar.toFixed(2)
          );
          bandar = 0;
          multiplier += 0.1;
        } else if (bandar <= 0) {
          hasil.push("bandar bangkrut");
        }
      }
      // Rungkad
      else if (Bangkrut < rate && rate <= Rungkad) {
        // max_win_rate += bet / (bet * 100);
        // money -= bet / 2;
        gacor_rate += 2;
        bandar += bet / 2;
        hasil.push("kamu dapet RUNGKAD -" + bet / 2);
        multiplier += bet / 10000;
      }
      // Bangkrut
      else if (rate <= Bangkrut) {
        // max_win_rate += bet / (bet * 10);
        // gacor_rate += 2;
        money -= bet;
        bandar += bet;
        hasil.push("kamu dapet BANGKRUT -" + bet);
        multiplier += bet / 10000;
      }
      {
        datas.bank = {
          ...datas["bank" || {}],
          multiplier,
          money: bandar,
        };
        datas.algortima = {
          ...datas["algortima" || {}],
          gacor: gacor_rate,
          max_win: max_win_rate,
        };
        datas.pemain[nick] = {
          ...datas[nick || {}],
          money,
        };
      }
      fs.writeFileSync("gacor.json", JSON.stringify(datas));
      console.log({
        hasil,
        rate,
        range,
        money,
        multiplier,
        bandar,
        asli: {
          Bangkrut,
          Rungkad,
          Gacor,
          Max_win,
        },
      });
    }
  }
};
const ape = () => {
  ap(1000, "dika");
  ap(1000, "diki");
  ap(1000, "diku");
  ap(1000, "dike");
  ap(1000, "dika1");
  ap(1000, "diki1");
  ap(1000, "diku1");
  ap(1000, "dike1");
  ap(1000, "dika2");
  ap(1000, "diki2");
  ap(1000, "diku2");
  ap(1000, "dike2");
  ap(1000, "dika12");
  ap(1000, "diki12");
  ap(1000, "diku12");
  ap(1000, "dike12");
  ap(10000, "dika123");
};
setInterval(() => {
  ape();
}, 100);
setTimeout(() => {
  clearInterval();
}, 10000);
// a(10000, "are", 2);
// ap(1000, "dika");
// {
//   data.bank = {
//     ...data["bank" || {}],
//     value,
//     change,
//     money: bandar,
//   };
//   data.nasabah[nick] = {
//     ...data[nick || {}],
//     money,
//   };
// }
