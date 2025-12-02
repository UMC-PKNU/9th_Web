import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchUser } from "../api/users";

export default function usePatchNickname() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUser,

    
    onMutate: async (newName: string) => {
      await queryClient.cancelQueries({ queryKey: ["my-info"] });

      const prevUser = queryClient.getQueryData(["my-info"]);

      // 닉네임 즉시 변경
      queryClient.setQueryData(["my-info"], (old: any) => ({
        ...old,
        name: newName,
      }));

      return { prevUser };
    },

    // 에러 시 롤백
    onError: (err, newName, context) => {
      queryClient.setQueryData(["my-info"], context?.prevUser);
    },

    // 성공/실패 상관없이 최신화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["my-info"] });
    },
  });
}
