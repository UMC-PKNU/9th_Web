import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../api/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: async () => {
      const response = await getLpList({
        cursor,
        search,
        order,
        limit,
      });
      console.log("useGetLpList 응답 데이터:", response);
      return response;
    },
    enabled: search?.trim() !=="", // 빈 문자열, 공백일 경우 api 요청 x
    staleTime: 1000 * 60 * 5,
    gcTime: 100 * 60 * 10,
  });
}

export default useGetLpList;
