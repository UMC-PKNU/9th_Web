import type { Task } from "../App";

interface StatsProps {
  tasks: Task[];
}

export default function Stats({ tasks }: StatsProps) {
  const completed = tasks.filter((t) => t.done).length;

  return (
    <div>
      <h2>하루 통계</h2>
      {completed === 0 ? (
        <p>아직 완료한 일이 없어요.</p>
      ) : (
        <p>오늘 완료한 할 일: <b>{completed}</b>개</p>
      )}
    </div>
  );
}
