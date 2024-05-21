import { api } from "../config/network";

export const getBoard = async () => {
  const res = await api("boards", "get");
  return res;
};

export const addBoard = async (data) => {
  await api("boards", "post", data);
};
