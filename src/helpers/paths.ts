export const getPath = (url: string, site: string): string => {
  let path = url.split(site)[1];
  if (path === "") {
    path = "/";
  }
  return path;
};
