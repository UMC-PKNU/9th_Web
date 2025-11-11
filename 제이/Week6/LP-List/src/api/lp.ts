import type { PaginationDto } from "../types/common.ts";
import  axiosInstance from "../api/axios.ts";
import  type { ResponseLpListDto } from "../types/lp.ts";


// LP 조회 관련 API
export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/lps", {
    params: paginationDto,
  });

  return data;
};
