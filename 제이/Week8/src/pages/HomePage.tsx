import { useState, useEffect } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import magnifier from "../assets/magnifier.png";
import useDebounce from "../hooks/useDebounce";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data, isPending, isError } = useGetLpList({
    search: debouncedSearch,
  });

  useEffect(() => {
    if (data) {
      console.log("LP 리스트 데이터:", data);
    }
  }, [data]);

  return (
    <div className="w-full flex justify-center mt-1">
      <div className="relative w-full max-w-md">

        <img
          src={magnifier}
          alt="검색 아이콘"
          className="absolute left-0 top-[30%] -translate-y-1/2 w-7 h-7 opacity-70 pointer-events-none"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색"
          className="
            w-full
            bg-transparent
            border-b border-gray-600
            text-white
            pl-9 pr-2 pt-[6px] pb-[4px]
            placeholder-gray-500
            focus:outline-none
            focus:ring-0
            focus:border-gray-300
          "
        />

        {/* 공백 검색어면 바로 빈 결과 보여주는게 UX적으로 부드럽다 */}
        <div className="mt-6">
          {data?.data?.data?.map((lp) => (
            <h1 key={lp.authorId}>{lp.title}</h1>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;