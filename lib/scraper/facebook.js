import axios from "axios";
import cheerio from "cheerio";
const facebook = (url) =>
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
    } catch (err) {
      reject(err);
      // console.log(err.message);
    }
  });
// fb("https://fb.watch/mdiBpoeU48/");
export { facebook };
// https://www.facebook.com/100094266947220/videos/766046331933367/
