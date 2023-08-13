import axios from "axios";
const diffusion = (
  prompt = "milf,armpit,doctor,purple hair,no pants,make a bra",
  negative_prompt = "ng_deepnegative_v1_75t, badhandv4 (worst quality:2), (low quality:2), (normal quality:2), lowres, bad anatomy, bad hands, normal quality, ((monochrome)), ((grayscale))",
  model_name = "majicmixRealistic_v5_56446.safetensors"
) =>
  new Promise((resolve, reject) => {
    axios("https://api.omniinfer.io/v2/txt2img", {
      method: "POST",
      data: {
        model_name,
        prompt,
        negative_prompt,
        batch_size: 1,
        width: 512,
        height: 512,
        sampler_name: "DPM++ 2M Karras",
        cfg_scale: 7,
        steps: 20,
      },
    })
      .then((result) => {
        const img =
          "https://stars-test.s3.amazonaws.com/free-prod/" +
          result.data.data.task_id +
          "-0.png";
        resolve({ img });
      })
      .catch((err) => {
        reject(err);
      });
  });

export { diffusion };

/*
List models
meinamix_meinaV10_55222.safetensors
meinamix_meinaV5WithoutVAE_11493.safetensors
majicmixRealistic_v4_40121.safetensors
majicmixRealistic_v2.safetensors
majicmixRealistic_v5_56446.safetensors
meinahentai_v2_14645.safetensors
perfectWorld_v1Baked_10452.safetensors
majicmixRealistic_v5_56446.safetensors
sweetMix_v12_22923.safetensors
*/
