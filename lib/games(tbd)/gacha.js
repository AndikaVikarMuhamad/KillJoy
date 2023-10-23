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
      hasil.push("kamu daper sr");
    } else if (randNumber <= R) {
      hasil.push("kamu dapet R");
    }
    console.log(randNumber, weight);
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
    hasil,
  };
  // console.log(randNumber);
};
console.log(b(90, 11.1, 6.0, 17.2, 100));
