import {
  TAGS_BASE,
  TAGS_OG,
  TAGS_SIMPLE,
  TAGS_TWITTER,
} from "./helpers/groups";
import { IAnalysedMetadata, IPage } from "./types";

const totalTags =
  TAGS_BASE.length + TAGS_SIMPLE.length + TAGS_OG.length + TAGS_TWITTER.length;

const analyse = (page: IPage): IAnalysedMetadata => {
  let baseTotal = 0;
  let simpleTotal = 0;
  let ogTotal = 0;
  let twitterTotal = 0;
  let overallTotal = 0;
  const baseMissing: any = [];
  const simpleMissing: any = [];
  const ogMissing: any = [];
  const twitterMissing: any = [];

  if (page.metadata) {
    TAGS_BASE.forEach((tag) => {
      const match = Object.keys(page.metadata).find((key) => key === tag.value);
      if (match) {
        baseTotal += 1;
        overallTotal += 1;
      } else {
        baseMissing.push(tag);
      }
    });

    TAGS_SIMPLE.forEach((tag) => {
      const match = Object.keys(page.metadata).find((key) => key === tag.value);
      if (match) {
        simpleTotal += 1;
        overallTotal += 1;
      } else {
        simpleMissing.push(tag);
      }
    });

    TAGS_OG.forEach((tag) => {
      const match = Object.keys(page.metadata).find((key) => key === tag.value);
      if (match) {
        ogTotal += 1;
        overallTotal += 1;
      } else {
        ogMissing.push(tag);
      }
    });

    TAGS_TWITTER.forEach((tag) => {
      const match = Object.keys(page.metadata).find((key) => key === tag.value);
      if (match) {
        twitterTotal += 1;
        overallTotal += 1;
      } else {
        twitterMissing.push(tag);
      }
    });
  }

  return {
    base: { score: (baseTotal / TAGS_BASE.length) * 100, missing: baseMissing },
    simple: {
      score: (simpleTotal / TAGS_SIMPLE.length) * 100,
      missing: simpleMissing,
    },
    og: { score: (ogTotal / TAGS_OG.length) * 100, missing: ogMissing },
    twitter: {
      score: (twitterTotal / TAGS_TWITTER.length) * 100,
      missing: twitterMissing,
    },
    overall: {
      score: (overallTotal / totalTags) * 100,
      missing:
        baseMissing.length +
        simpleMissing.length +
        ogMissing.length +
        twitterMissing.length,
    },
  };
};

export default analyse;
