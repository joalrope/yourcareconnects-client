export const createObjectId = (id: string) => {
  const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);

  const objectId = `${timestamp}${id}`
    .replace(/[x]/g, () => {
      return Math.floor(Math.random() * 16).toString(16);
    })
    .toLowerCase();

  return objectId;
};
