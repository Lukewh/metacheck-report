import { atom, selector } from "recoil";
import analyse from "./analyse";
import { getPath } from "./helpers/paths";

import type { IRawData } from "./types";

export const rawDataAtom = atom<IRawData | null>({
  key: "rawDataAtom",
  default: null,
});

export const rawDataState = selector({
  key: "rawDataState",
  get: ({ get }) => get(rawDataAtom),
  set: ({ set }, newValue) => {
    if (newValue) {
      const newData = { ...(newValue as IRawData) };
      newData.pages = newData.pages
        .map((page) => ({
          ...page,
          display: getPath(page.url, page.site),
          metadataAnalysis: analyse(page),
          encodedURL: encodeURIComponent(page.url),
        }))
        .sort((a, b) => a.url.localeCompare(b.url));
      set(rawDataAtom, newData);
    }
  },
});

export const errorCodesState = selector({
  key: "errorCodesState",
  get: ({ get }) => {
    const data = get(rawDataState) as IRawData;
    return data?.pages.reduce((acc, page) => {
      const code = page.status;

      if (!acc[code]) {
        acc[code] = [];
      }
      acc[code].push(page);
      return acc;
    }, {} as any);
  },
});

export const tagCountState = selector({
  key: "tagCountState",
  get: ({ get }) => {
    const data = get(rawDataState) as IRawData;
    return data?.pages.reduce((acc, page) => {
      const metaCount = page.metadata ? Object.keys(page.metadata).length : 0;

      if (!acc[metaCount]) {
        acc[metaCount] = [];
      }

      acc[metaCount].push(page);
      return acc;
    }, {} as any);
  },
});
