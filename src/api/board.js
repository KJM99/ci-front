import { api } from "../config/network";

export const getBoard = async () => {
  const res = await api("/api/v1/boards", "get");
  return res;
};

export const addBoard = async (data) => {
  await api("/api/v1/boards", "post", data);
};
