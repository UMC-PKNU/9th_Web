import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../api/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  const trimmed = search?.trim() || "";     // 공백 제거된 검색어
  const effectiveSearch = trimmed === "" ? null : trimmed;

  return useQuery({
    queryKey: [QUERY_KEY.lps, effectiveSearch, order],
    queryFn: async () => {
      const response = await getLpList({
        cursor,
        search: trimmed,
        order,
        limit,
      });
      console.log("useGetLpList 응답 데이터:", response);
      return response;
    },
    enabled: effectiveSearch !== null,   // 공백이면 호출 안함
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetLpList;
