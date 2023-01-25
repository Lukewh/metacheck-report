import { atom, selector } from "recoil";

import type { IRawData, IRawPage } from "./types";

export const rawDataState = atom<IRawData | null>({
  key: "rawDataState",
  default: null,
});

export const errorCodesState = selector({
  key: "errorCodesState",
  get: ({ get }) => {
    const data = get(rawDataState);
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
    const data = get(rawDataState);
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
