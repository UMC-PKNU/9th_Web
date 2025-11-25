import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../api/users";

export default function useGetMyInfo() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMyInfo,
    staleTime: 1000 * 60 * 5,
  });
}
