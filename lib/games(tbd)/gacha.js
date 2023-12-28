const b = (r_rate, sr_rate, ssr_rate, event_rate, x) => {
  r_rate *= 100;
  sr_rate *= 100;
  ssr_rate *= 100;
  event_rate *= 100;

  let R = r_rate;
  let SR = R + sr_rate;
  let SSR = SR + ssr_rate;
  let EVENT = SSR + event_rate;
  let hasil = [];
  let weight = r_rate + sr_rate + ssr_rate + event_rate;
  for (let i = 0; i < x; i++) {
    let res,
      randNumber = Math.floor(Math.random() * parseFloat(weight));
    if (SSR < randNumber && randNumber <= EVENT) {
      hasil.push("kamu dapet event");
    } else if (SR < randNumber && randNumber <= SSR) {
      hasil.push("kamu dapet SSR");
    } else if (R < randNumber && randNumber <= SR) {
      hasil.push("kamu dapet SR");
    } else if (randNumber <= R) {
      hasil.push("kamu dapet R");
    }
    // console.log(randNumber, weight);
  }
  // Mencari rentang rate
  let shuffledArray = [];
  let stop = false;
  while (stop === false) {
    if (hasil.length < 1) stop = true;
    else {
      var index = Math.floor(Math.random() * hasil.length);
      var item = hasil[index];
      hasil.splice(index, 1);
      shuffledArray.push(item);
      stop = false;
    }
  }
  return {
    shuffledArray,
  };
  // console.log(randNumber);
};
const ajg = async () => {
  let result = [];
  for (let a = 1; a <= 1000; a++) {
    let ala = false;
    let i = 0;
    while (ala == false) {
      i++;
      const a = b(90, 11.1, 0.02, 17.2, 1);
      if (a.shuffledArray[0] == "kamu dapet SSR") {
        ala = true;
      }
    }
    result.push(i);
  }
  const panjang = result.length;
  const mean = result.reduce((a, b) => a + b) / panjang;
  const gacor = Math.min.apply(Math, result);
  const rungkad = Math.max.apply(Math, result);
  // console.table(result);
  // console.log({ result, mean, gacor, rungkad });
  return {
    result,
    mean,
    gacor,
    rungkad,
  };
};
// ajg();
const te = () => {
  const a = b(72, 30, 3, 12, 100).shuffledArray;
  const SSR = a.filter((v) => v == "kamu dapet SSR").length;
  const SR = a.filter((v) => v == "kamu dapet SR").length;
  const R = a.filter((v) => v == "kamu dapet R").length;
  const EVENT = a.filter((v) => v == "kamu dapet event").length;
  console.table({
    SSR,
    SR,
    R,
    EVENT,
  });
  return {
    SSR,
    SR,
    R,
    EVENT,
  };
};
// te();

// console.table(b(90, 11.1, 6.0, 17.2, 100000).shuffledArray);
