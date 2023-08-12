import axios from "axios";
import { pickrandom } from "./allfunc.js";
const pinterest = (search) =>
  new Promise((resolve, reject) => {
    axios
      .get(
        `https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${search}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${search}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`
      )
      .then((response) => {
        const img = pickrandom(response.data.resource_response.data.results)
          .images.orig.url;
        resolve({
          img,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
export { pinterest };
