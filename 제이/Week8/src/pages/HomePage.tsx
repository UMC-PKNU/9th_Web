import { useState, useEffect } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import magnifier from "../assets/magnifier.png";

const HomePage = () => {
  const [search, setSearch] = useState("타입");
  const { data, isPending, isError } = useGetLpList({ search });

  useEffect(() => {
    if (data) {
      console.log("LP 리스트 데이터:", data);
    }
  }, [data]);

  if (isPending) {
    return <div className="mt-20">Loading...</div>;
  }

  if (isError) {
    return <div>Error.</div>;
  }

  return (
    <div className="w-full flex justify-center mt-1">
      <div className="relative w-full max-w-md">
        <img src = {magnifier}
        alt = "검색 아이콘"
        className="absolute left-0 top-[30%]-translate-y-1/2 w-7 h-7 opacity-70"/>
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


      <div className="mt-6">
        {data?.data?.data?.map((lp) => (
        <h1>{lp.title}</h1>
      ))}
      </div>  
      </div>
    </div>
    
  );
};

export default HomePage;