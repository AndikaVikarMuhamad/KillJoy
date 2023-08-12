import { valorant } from "../lib/scraper/index.mjs";

valorant;
let handler = async (m, { conn, text }) => {
  if (!text) throw "Masukan nick dan tag nya\nContoh : Ciell#mine";
  try {
    // console.log(text);
    const data = await valorant(text);
    let agents = "";
    for (const v of data.fav_agents) {
      const teks = `╭─「 *${v.agent}* 」\n│\n│ *Matches :* ${v.matches}\n│ *Kd :* ${v.kd}\n│ *Acs :* ${v.acs}\n│ *Time Played :* ${v.time_played}\n│ *Win Percent :* ${v.win_percent}\n╰────\n`;
      agents += teks;
    }
    let weapons = "";
    for (const v of data.fav_weapon) {
      const teks = `╭─「 *${v.weapon}* 」\n│\n│ *Kills :* ${v.kills}\n│ *Headshot Rate :* ${v.headshot_rate}\n│ *Bodyshot Rate :* ${v.bodyshot_rate}\n│ *Legshot Rate :* ${v.legshot_rate}\n╰────\n`;
      weapons += teks;
    }
    let role = "";
    for (const v of data.role_stats) {
      const teks = `╭─「 *${v.role}* 」\n│\n│ *Stat :* ${v.stat}\n│ *Winrate :* ${v.wr}\n│ *kd :* ${v.kd}\n│ *Kda :* ${v.kda}\n╰────\n`;
      role += teks;
    }
    let map = "";
    for (const v of data.top_map) {
      const teks = `╭─「 *${v.map}* 」\n│\n│ *Stat :* ${v.stat}\n│ *Winrate :* ${v.wr}\n╰────\n`;
      map += teks;
    }
    const result = `*Nickname :* ${text.split("#")[0]}\n*Current Rank :* ${
      data.current_rank
    }\n*Acs :* ${data.acs}\n*Total Kills :* ${
      data.total_kills
    }\n*Total deaths :* ${data.total_deaths}\n*Total assist :* ${
      data.total_assists
    }\n*Total 1v1 Cluth :* ${
      data.total_1v1_clutch
    }\n*Average Kill Per Round :* ${
      data.average_kill_per_rounds
    }\n\n*Fav Agents*\n\n${agents}\n\n*Fav Weapon*\n\n${weapons}\n\n*Roles Stats*\n\n${role}\n\n*Top Map*\n\n${map}`;
    m.reply(result.trim());
    // console.log(data);
  } catch (err) {
    console.log(err.message);
    m.reply("tar di fix(kalo bisa)");
  }
};
handler.tags = ["internet"];
handler.command = /^valo(rant)?(stalk(er)?)?$/i;
handler.help = ["valo"];
export default handler;
