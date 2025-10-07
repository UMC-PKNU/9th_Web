interface HeaderProps {
  setPage: (page: "home" | "routine" | "stats") => void;
}

export default function Header({ setPage }: HeaderProps) {
  return (
    <nav>
      <button onClick={() => setPage("home")}>할 일</button>
      <button onClick={() => setPage("routine")}>루틴</button>
      <button onClick={() => setPage("stats")}>통계</button>
    </nav>
  );
}
