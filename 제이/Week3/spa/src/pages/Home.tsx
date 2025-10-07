import { useState } from "react";
import type { Task } from "../App";

interface HomeProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function Home({ tasks, setTasks }: HomeProps) {
  const [todo, setTodo] = useState("");

  const addTask = () => {
    if (!todo.trim()) return;
    const newTask = { id: Date.now(), text: todo, done: false };
    setTasks([...tasks, newTask]);
    setTodo("");
  };

  const toggleDone = (id: number) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === id) {
        return { ...t, done: !t.done };
      } else {
        return t;
      }
    });
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h2>오늘의 공부</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="할 일 입력"
        />
        <button onClick={addTask}>추가</button>
      </div>

      {tasks.length === 0 ? (
        <p>아직 할 일이 없어요.</p>
      ) : (
        <ul>
          {tasks.map((t) => (
            <li
              key={t.id}
              onClick={() => toggleDone(t.id)}
              style={{
                textDecoration: t.done ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {t.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
