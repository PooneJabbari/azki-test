import axios, { AxiosResponse, AxiosError } from "axios";

type Usage = { id: number; title: string };

export type VehicleType = { id: number; title: string; usages: Usage[] };

export const getVehicleTypes = async () => {
  try {
    const { data } = await axios.get<VehicleType[]>(
      "https://www.azki.com/api/product/vehicle/types",
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
    } else {
      console.log("unexpected error: ", error);
    }
  }
};

// export const getGeneration = ({
//   input,
//   format,
//   length,
// }: {
//   input: string;
//   length: string;
//   format: string;
// }) => {
//   const data = {
//     model: "deepseek-chat",
//     messages: [
//       {
//         role: "user",
//         content: `Please rewrite below text in length ${length} and format ${format} in English:"${input}"`,
//       },
//     ],
//   };
//   if (!input.length) return;
//   return axios
//     .post("https://api.deepseek.com/v1/chat/completions", data, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.PLASMO_PUBLIC_DEEPSEEK_API_KEY}`,
//       },
//     })
//     .then((res) => res.data.choices[0].message.content);
// };
