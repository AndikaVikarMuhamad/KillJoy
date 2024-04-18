import axios from "axios";
import cheerio from "cheerio";
const valorant = (nickname) =>
  new Promise((resolve, reject) => {
    axios
      .get(
        `https://tracker.gg/valorant/profile/riot/${encodeURIComponent(
          nickname
        )}/overview?playlist=competitive&season=all`,
        {
          headers: {
            "User-Agent": "insomnia/8.5.1",
            Cookie:
              "__cf_bm=MItEmiQHz9GPHzJRb20tbcZqyMr.QjGjnl8CsboDmfM-1712629675-1.0.1.1-OGjgQxWoDYMIB3yuFN0soBZevnZJJZMs9R5Hf_jk_QvDg6sytA2mIptWlv3bxvuPfXOxeegQL9ac4rxZ6aHYgoN5SRtzKuqrDm7FAxNq37U; cf_clearance=eJHFwVMhH1Ock.dK.cr6kjc54WxicuXHOoZ.L1rY6u0-1712629686-1.0.1.1-JnaNNKVW3khp2LKiUe_uxToUaOmJ6Aev3JzbuQ3tMOSDPiV5Wmeu6ZwnASFKBkXjZIG0kjkva804Oqk2RPHpUg; _ga=GA1.1.911548351.1712629689; _pbjs_userid_consent_data=3524755945110770; _sharedid=519c1b1a-7d83-4f42-ad3b-da0b87ed29f2; cto_bidid=6ZbjdF84JTJCTnJmMk0lMkY4YnQwVGpqRURuaFY3aFFoZm1NdnoxV1B3TXVLVmFaZEdDSFlGdURWUEh3YkZTc28zJTJGZ3ZJWW9Fa1BmY2pHaGJRUUw3a1JLd3lTY09xREFaV09hVTlEcnRQOHVQV1drZHVuOCUzRA; _ga_HWSV72GK8X=GS1.1.1712629688.1.1.1712629746.0.0.0; cto_bundle=6oIAcV9nbGRIYUtZWng2WE9VVHclMkZiekVaa3d6emVvallFQWx3SzY2M0ZwREU4UmJpZFNFQlEwSnFya2Z4MmpycmhsSzZsUDE2enNnM3pLbkU2NUczOGZ4UzduQ2hmY2ZueGY0SjM2NzJQcXpNYTBnRFk0VjJvNFhnJTJCS00lMkZSU1puWWZub0xCOWc0QmJqTDVSVnJEdGUlMkJpSFBPZyUzRCUzRA; __gads=ID=e70560eab50be138:T=1712629750:RT=1712629750:S=ALNI_MbVFH96u5umh1fXVTsiDt8gtqvXzQ; __eoi=ID=310076429576e35c:T=1712629750:RT=1712629750:S=AA-Afjbsvo1p8IOKYXKBiQ8qm2FA",
          },
        }
      )
      .then((response) => {
        if (response.status == 404) {
          reject({
            message:
              "akun tidak di temukan atau akun privat,periksa kembali nick dan tag",
          });
        } else {
          const html = response.data;
          const C = cheerio.load(html);
          // Gtw apaan jir
          const avatar = C(".user-avatar__image").attr("src");
          const current_rank = C(".stat__value").text().trim();
          const total_wins = C(".main > div").eq(0).find(".value").text();
          const total_kills = C(".main > div").eq(3).find(".value").text();
          const total_deaths = C(".main > div").eq(4).find(".value").text();
          const total_assists = C(".main > div").eq(5).find(".value").text();
          const acs = C(".main > div").eq(6).find(".value").text();
          const average_kill_per_rounds = C(".main > div")
            .eq(8)
            .find(".value")
            .text();
          const total_1v1_clutch = C(".main > div").eq(9).find(".value").text();
          const fav_agents = [];
          C(".st-content__category > .st-content__item").each((i, e) => {
            const agent = C(e).find(".value").eq(0).text();
            const matches = C(e).find(".label").text().replace("Matches", "");
            const time_played = C(e).find(".value").eq(1).text();
            const win_percent = C(e).find(".value").eq(2).text();
            const kd = C(e).find(".value").eq(3).text();
            const acs = C(e).find(".value").eq(5).text();
            const data = {
              agent,
              matches,
              time_played,
              win_percent,
              kd,
              acs,
            };
            fav_agents.push(data);
          });
          const fav_weapon = [];
          C(".top-weapons__content > .weapon").each((i, e) => {
            const weapon = C(e).find(".weapon__name").text();
            const headshot_rate = C(e).find(" .stat:nth-child(1)").text();
            const bodyshot_rate = C(e).find(" .stat:nth-child(2)").text();
            const legshot_rate = C(e).find(" .stat:nth-child(3)").text();
            const kills = C(e).find(".weapon__main-stat > .value").text();
            const data = {
              weapon,
              headshot_rate,
              bodyshot_rate,
              legshot_rate,
              kills,
            };
            fav_weapon.push(data);
          });
          const role_stats = [];
          C(".roles__list > .role").each((i, e) => {
            const role = C(e).find(".role__name").text();
            const wr = C(e)
              .find(".role__value")
              .eq(0)
              .text()
              .replace("WR", "")
              .trim();
            const kd = C(e)
              .find(".role__value")
              .eq(1)
              .text()
              .replace("KDA", "")
              .trim();
            const stat = C(e).find(".role__sub").eq(0).text().trim();
            const kda = C(e).find(".role__sub").eq(1).text();
            const data = {
              role,
              stat,
              wr,
              kd,
              kda,
            };
            role_stats.push(data);
          });
          const top_map = [];
          C(".top-maps__maps > .top-maps__maps-map").each((i, e) => {
            const map = C(e).find(".name").text().trim();
            const wr = C(e).find(".value").text().trim();
            const stat = C(e).find(".label").text().trim();
            const data = {
              map,
              stat,
              wr,
            };
            top_map.push(data);
          });
          const result = {
            avatar,
            current_rank,
            total_wins,
            acs,
            total_kills,
            total_deaths,
            total_assists,
            total_1v1_clutch,
            average_kill_per_rounds,
            fav_agents,
            fav_weapon,
            role_stats,
            top_map,
          };
          resolve(response.data);
          // console.log(result);
        }
      })
      .catch((err) => {
        // console.log(err.message);
        reject(err);
      });
  });
// valorant("Cielll#mine")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const vlr = () =>
  new Promise((resolve, reject) => {
    axios
      .get("https://www.vlr.gg/")
      .then((response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const upcomingmatch = [];
        C(".js-home-matches-upcoming > div > a").each((i, e) => {
          const team = C(e)
            .find(".h-match-team-name")
            .text()
            .replace("\t", "")
            .replace("\n", "");
          upcomingmatch.push(team);
        });
        console.log(upcomingmatch);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

// vlr();
export { valorant, vlr };
