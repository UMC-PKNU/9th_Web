import { useState, useEffect } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";

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
    <div className="mt-20">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-black-400 rounded px-3"
      />
      {data?.data?.data?.map((lp) => (
        <h1>{lp.title}</h1>
      ))}
    </div>
  );
};

export default HomePage;
