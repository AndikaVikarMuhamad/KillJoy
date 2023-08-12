import jimp from "jimp";
import sharp from "sharp";
import PDFDocument from "pdfkit";
import axios from "axios";
const getBuffer = async (url, options) => {
  try {
    options ? options : {};
    const res = await axios({
      method: "get",
      url,
      headers: {
        DNT: 1,
        "Upgrade-Insecure-Request": 1,
      },
      ...options,
      responseType: "arraybuffer",
    });
    return res.data;
  } catch (err) {
    console.log(`Error : ${err}`);
  }
};
const pickrandom = (arr) => {
  return arr[Math.floor(arr.length * Math.random())];
};

function toPDF(images, opt = {}) {
  return new Promise(async (resolve, reject) => {
    if (!Array.isArray(images)) images = [images];
    let buffs = [];
    const { data } = await axios.get(images[0], {
      responseType: "arraybuffer",
      ...opt,
    });
    const jpeg = await sharp(data).jpeg().toBuffer();
    const size = await jimp.read(jpeg);
    const width = size.getWidth();
    const height = size.getHeight();
    const doc = new PDFDocument({ size: [width, height] });
    doc.image(jpeg, 0, 0, { width: width, height: height });

    for (let v = 1; v < images.length; v++) {
      const { data } = await axios.get(images[v], {
        responseType: "arraybuffer",
        ...opt,
      });
      const jpeg = await sharp(data).jpeg().toBuffer();
      const size = await jimp.read(jpeg);
      const width = size.getWidth();
      const height = size.getHeight();
      doc.addPage({ size: [width, height] });
      doc.image(jpeg, 0, 0, { width: width, height: height });
    }
    doc.on("data", (chunk) => buffs.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(buffs)));
    doc.on("error", (err) => reject(err));
    doc.end();
  });
}
export { getBuffer, pickrandom, toPDF };
