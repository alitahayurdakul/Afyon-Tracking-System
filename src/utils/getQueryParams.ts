import { ReadonlyURLSearchParams } from "next/navigation";

type QueryValue = string | string[];
type QueryObject = Record<string, QueryValue>;

export const getQueryParams = (
  searchParams: ReadonlyURLSearchParams,
): QueryObject => {
  const query: QueryObject = {};
  for (const key of searchParams.keys()) {
    const values = searchParams.getAll(key);
    if (key === "durationType" && values.length > 1) {
      return {};
    } else {
      query[key] = values.length > 1 ? values : values[0];
    }
  }
  return query;
};
