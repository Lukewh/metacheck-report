export const TAGS_BASE = [
  { type: "tag", value: "title" },
  { type: "key", value: "charset" },
  { type: "name", value: "description" },
  /*{name: "keywords"},
  {name: "author"},*/
  { type: "name", value: "viewport" },
];

export const TAGS_SIMPLE = [
  { type: "name", value: "keywords" },
  { type: "name", value: "author" },
  { type: "name", value: "theme-color" },
  { type: "name", value: "robots" },
];

export const TAGS_OG = [
  { type: "property", value: "og:title" },
  { type: "property", value: "og:description" },
  { type: "property", value: "og:type" },
  { type: "property", value: "og:url" },
  { type: "property", value: "og:image" },
  { type: "property", value: "og:image:width" },
  { type: "property", value: "og:image:height" },
  { type: "property", value: "og:image:alt" },
  { type: "property", value: "og:site_name" },
  { type: "property", value: "og:locale" },
];

export const TAGS_TWITTER = [
  { type: "property", value: "twitter:title" },
  { type: "property", value: "twitter:description" },
  { type: "property", value: "twitter:card" },
  { type: "property", value: "twitter:site" },
  { type: "property", value: "twitter:creator" },
  { type: "property", value: "twitter:image" },
];
