import { fetchWithToken } from "../helpers/fetch";

export const docDeleteService = async (id: string, name: string) => {
  const resp = await fetchWithToken(
    `/uploads/docs/${id}/${name}`,
    {},
    "DELETE"
  );

  return resp;
};

export const getFilesService = async (id: string, type: "images" | "docs") => {
  const resp = await fetchWithToken(`/uploads/files/${id}/${type}`);
  return await resp;
};
