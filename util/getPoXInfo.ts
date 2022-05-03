import fetch from "cross-fetch";
import { IPoXInfo } from "../types";

export const getPoXInfo = async (): Promise<IPoXInfo> => {
  const response = await fetch(`${process.env.STACKS_URL}/v2/pox`);
  const data = await response.json();
  return data;
};
