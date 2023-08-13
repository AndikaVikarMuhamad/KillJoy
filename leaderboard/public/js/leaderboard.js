fetch("/db")
  .then(async (result) => {
    const v = await result.json();
    // console.log(v);
    const b = document.querySelector(".leaderboard");
    const data = v.data.users;
    let sortedexp = Object.entries(data).sort((a, b) => b[1].exp - a[1].exp);
    let ajs = "";
    for (let i = 0; i < sortedexp.length; i++) {
      const no = sortedexp[0][0].replace("@s.whatsapp.net", "");
      let a = `  <div class="container">
      <div class="wrapper">
        <h3 class="pos">#${i + 1}</h3>
        <img
          src="${sortedexp[i][1].pfp}"
          class="pp"
          alt=""
        />
        <h1 class="name">${sortedexp[i][1].name}</h1>
        <h1 class="name">${sortedexp[i][1].name}12321312312123123123123123</h1>
        <p>
          Exp: ${sortedexp[i][1].exp} Level : ${sortedexp[i][1].level}
        </p>
      </div>
      <div class="button-wrapper">
        <button class="btn outline">DETAILS</button>
        <button class="btn fill">BUY NOW</button>
      </div>
    </div>`;
      ajs += a;
    }
    b.innerHTML = ajs;
  })
  .catch((err) => {
    console.log(err);
  });
