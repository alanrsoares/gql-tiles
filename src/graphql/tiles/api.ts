import apiClient from "../../lib/apiClient";
import { TileApiResponse, GetTilesParams } from "./types";

function translateKeys<T extends {}>(
  translations: Record<string, string>,
  obj: T
) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const translatedKey = key in translations ? translations[key] : key;
    return {
      ...acc,
      [translatedKey]: value
    };
  }, {});
}

const paramTranslationMap = {
  pageSize: "page[size]",
  pageNumber: "page[number]"
};

export async function fetchWithPagination(
  params: GetTilesParams
): Promise<TileApiResponse> {
  const $params = translateKeys(paramTranslationMap, params);
  const response = await apiClient.get<TileApiResponse>("/tiles", {
    params: $params
  });
  return response.data;
}
