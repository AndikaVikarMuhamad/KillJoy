import Jimp from "jimp";
import fs from "fs";

const welcome = async (url) =>
  new Promise((resolve, reject) => {
    Jimp.read("./assets/img/welcome.jpg")
      .then((img) => {
        // Do stuff with the image.
        img.sepia();
        resolve(img.bitmap.data);
      })
      .catch((err) => {
        // Handle an exception.
        console.log(err);
      });
  });

welcome(
  "https://pict.sindonews.net/dyn/360/pena/news/2022/05/15/700/769971/6-serial-anime-yang-produksinya-dibuat-2-studio-berbeda-ayl.jpg",
  "123456789012345678901234567890"
)
  .then((img) => {
    console.log(img);
    fs.writeFileSync("./welcome.png", img);
  })
  .catch((err) => console.log(err));
