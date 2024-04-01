import axios from "axios";

type Item = { id: number; title: string };

axios.defaults.baseURL = "https://www.azki.com/api/product";

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.log("error message: ", error.message);
  } else {
    console.log("unexpected error: ", error);
  }
};

export type VehicleType = Item & { usages: Item[] };

export const getVehicleTypes = async () => {
  try {
    const { data } = await axios.get<VehicleType[]>("/vehicle/types");
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getInsureCompanies = async () => {
  try {
    const { data } = await axios.get<Item[]>("/third/companies");
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getThirdDiscounts = async () => {
  try {
    const { data } = await axios.get<Item[]>("/third/third-discounts");
    return data;
  } catch (error) {
    handleError(error);
  }
};
