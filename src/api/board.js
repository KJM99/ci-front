import { api } from "../config/network";

export const getBoard = async () => {
  const res = await api("/api/v1/boards", "get", "", 1);
  return res;
};

export const addBoard = async (data) => {
  await api("/api/v1/boards", "post", data, 1);
};

export const getComment = async () => {
  const res = await api("/comments", "get", "", 2);
  return res;
};

export const addBoardComment = async (data) => {
  await api("/comments", "post", data, 2);
};

export const deleteComment = async (data) => {
  await api("/comments", "delete", data, 2);
};
