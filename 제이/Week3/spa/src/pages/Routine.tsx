import { useState } from "react";

export default function Routine() {
  const [routines, setRoutines] = useState<string[]>([]);
  const [goal, setGoal] = useState("");

  const addRoutine = () => {
    if (!goal.trim()) return;

    const newRoutine = goal;
    const updated = [...routines, newRoutine];

    setRoutines(updated);
    setGoal("");
  };

  return (
    <div>
      <h2>오늘 하루 루틴</h2>
      <div>
        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="루틴 입력"
        />
        <button onClick={addRoutine}>추가</button>
      </div>
      <ul>
        {routines.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}
