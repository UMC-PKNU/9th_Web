import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Routine from "./pages/Routine";
import Stats from "./pages/Stats";
import "./App.css";

export interface Task {
  id: number;
  text: string;
  done: boolean;
}

type Page = "home" | "routine" | "stats";

function App() {
  const [page, setPage] = useState<Page>("home");
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <div className="app-container">
      <Header setPage={setPage} />
      {page === "home" && <Home tasks={tasks} setTasks={setTasks} />}
      {page === "routine" && <Routine />}
      {page === "stats" && <Stats tasks={tasks} />}
    </div>
  );
}

export default App;
