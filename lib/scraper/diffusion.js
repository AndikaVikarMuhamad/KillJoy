import axios from "axios";
const diffusion1 = (
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
const diffusion = (
  prompt = "armpit,milf,bussines woman,beatuiful girl",
  negative_prompt = "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name",
  version = "09a5805203f4c12da649ec1923bb7729517ca25fcac790e640eaa9ed66573b65"
) =>
  new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      url: "https://replicate.com/api/predictions",
      headers: {
        cookie: "replicate_anonymous_id=1f86c6e6-bd11-4f6f-a32a-503b616fdf18",
        "Content-Type": "application/json",
        "User-Agent": "Insomnia/2023.5.5",
        Referer: "https://replicate.com/cjwbw/anything-v3-better-vae?",
        Origin: "https://replicate.com",
        "X-Csrftoken": "iYVrXRVUVPfSotf3dlB26VBk2T2VSg7v",
      },
      data: {
        version:
          "f410ed4c6a0c3bf8b76747860b3a3c9e4c8b5a827a16eac9dd5ad9642edce9a2",
        input: {
          width: 512,
          height: 512,
          prompt: prompt,
          scheduler: "DPMSolverMultistep",
          num_outputs: 1,
          guidance_scale: 12,
          negative_prompt:
            "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name",
          num_inference_steps: 50,
        },
        is_training: false,
      },
    };

    axios("https://replicate.com/api/predictions", options)
      .then(({ data }) => {
        resolve({ result: `https://replicate.com/api/predictions/${data.id}` });
      })
      .catch((err) => {
        // console.log(err.message);
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
// const a = {
//   headers: {
//     Cookie:
//       "replicate_anonymous_id=3e89b585-6fe7-43b4-b369-b405e907e114; rl_page_init_referrer=RudderEncrypt%3AU2FsdGVkX18C6%2Bhpvh66iZh5rbB%2BYcC11vO8tPdEKudie1WLNq308SNKsJgKuls6; rl_page_init_referring_domain=RudderEncrypt%3AU2FsdGVkX1%2FkaPc2BoAD0tMCDozHVI7f2jykvw5mU28kuHscYE540FZ8YTar%2BNVp; csrftoken=iYVrXRVUVPfSotf3dlB26VBk2T2VSg7v; rl_session=RudderEncrypt%3AU2FsdGVkX1%2FPIlsnvVYofNjZ56v7lvTS%2Fm4LKlYBVg%2BkGyLINHymjuPiqdXf70JYtb8GrvX%2F23FP9lgWDCH1tlF7vL04j9fxqCQLyrBDtk0FvovDK%2FdH7vMv3e%2BERKQ38Gl%2FbXE89TNjO%2Bg1ocDAGA%3D%3D; rl_user_id=RudderEncrypt%3AU2FsdGVkX1%2BF0GJQ%2F3suwN3mO2uZBNb98nm%2BltlziFY%3D; rl_trait=RudderEncrypt%3AU2FsdGVkX1%2FROy%2BHF5KkFBR%2BtPMWN2PG0wCZ6oCcVD0%3D; rl_group_id=RudderEncrypt%3AU2FsdGVkX1%2Bnx6dVGQiWdcOJouJpYA0RCxVNKgxK398%3D; rl_group_trait=RudderEncrypt%3AU2FsdGVkX1%2BVHh%2FRGefo3YP22HUsqn5ztXVihENn%2FoQ%3D; rl_anonymous_id=RudderEncrypt%3AU2FsdGVkX1%2B0WEj3DuPsQpyWpjxJHyoyoFJKooHauZbAOoHL8XYPizFsmq7F1MvbQ%2B7qJeAWdYNoqx6bPpJ0nA%3D%3D",
//     Referer:
//       "https://replicate.com/ai-forever/kandinsky-2?prediction=zycewqzbehl7c2slnp3sw5td7u",
//     Origin: "https://replicate.com",
//     "X-Csrftoken": "iYVrXRVUVPfSotf3dlB26VBk2T2VSg7v",
//   },
//   method: "post",
//   data: {
//     version,
//     input: {
//       width: 512,
//       height: 640,
//       prompt,
//       scheduler: "DPMSolverMultistep",
//       num_outputs: 1,
//       guidance_scale: 12,
//       negative_prompt,
//       num_inference_steps: 50,
//     },
//     is_training: false,
//   },
// };
