const pe = () => {
  let a = [];
  for (let i = 1000; i < 10000; i++) {
    if (i % 5 == 0) {
      a.push(i);
    }
  }

  console.log(a.length);
};
pe();
console.log(9 * 10 * 10 * 2);
