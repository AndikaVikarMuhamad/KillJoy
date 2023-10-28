import axios from "axios";
import cheerio from "cheerio";
const facebook1 = (url) =>
  new Promise(async (resolve, reject) => {
    try {
      const pp = await axios.get("https://snapsave.io/id8/download-facebook");
      const _token = pp.data.split('k__token="')[1].split('";')[0];
      const _exp = pp.data.split('k_time="')[1].split('";')[0];
      const { data } = await axios(
        "https://snapsave.io/api/ajaxSearch/facebook",
        {
          method: "post",
          data: new URLSearchParams(
            Object.entries({
              k_exp: _exp,
              k_token: _token,
              q: url,
              vt: "facebook",
            })
          ),
        }
      );
      const { duration, title, thumbnail } = data;
      const link = data.links.sd;
      const result = {
        title,
        duration,
        thumbnail,
        link,
      };
      resolve(result);
      console.log(result);
    } catch (err) {
      reject(err);
      console.log(err.message);
    }
  });
const facebook = (url) =>
  new Promise(async (resolve, reject) => {
    try {
      const pp = await axios.get("https://savefb.app/en", {
        headers: {
          "User-Agent": "Get the LLLL",
        },
      });
      const k_token = pp.data.split('k_token="')[1].split('"')[0];
      const k_exp = pp.data.split('k_exp="')[1].split('"')[0];
      const ajax = await axios("https://savefb.app/api/ajaxSearch", {
        method: "POST",
        headers: {
          Origin: "https://savefb.app",
          Referer: "https://savefb.app/en",
          "User-Agent": "apalah",
        },
        data: new URLSearchParams(
          Object.entries({
            k_exp,
            k_token,
            q: url,
            lang: "en",
            v: "v2",
          })
        ),
      });
      const C = cheerio.load(ajax.data.data);
      const apalah = [];
      C('td > a:contains("Download")').each((i, e) => {
        apalah.push(C(e).attr("href"));
      });
      const link = C('a:contains("Download")').attr("href");
      resolve({ link, apalah });
    } catch (err) {
      reject(err);
      // console.log(err.message);
    }
  });
// facebook(
//   "https://www.facebook.com/isnan.nasrul.ansori.17122002/videos/2001622716889506/?idorvanity=4886379928111830&mibextid=zDhOQc"
// );
export { facebook, facebook1 };
// https://www.facebook.com/100094266947220/videos/766046331933367/
// https://www.facebook.com/100052279572047/videos/710858077569398/
