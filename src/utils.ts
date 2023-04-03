import { getCollection } from "astro:content";

export function basename(str: string, sep: string) {
  return str.slice(str.lastIndexOf(sep) + 1);
}

export const getNonDraftPosts = async () => {
  return getCollection(
    "blog",
    ({ data }) => import.meta.env.DEV || !data?.draft
  );
}
