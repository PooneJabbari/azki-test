import axios, { AxiosResponse, AxiosError } from "axios";

type Usage = { id: number; title: string };

export type VehicleType = { id: number; title: string; usages: Usage[] };

export type InsureCompany = {
  id: number;
  title: string;
};

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

export const getInsureCompanies = async () => {
  try {
    const { data } = await axios.get<InsureCompany[]>(
      "https://www.azki.com/api/product/third/companies",
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
