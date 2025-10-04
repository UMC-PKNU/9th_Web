import { useState } from "react";
import "./todoStyle.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoComponent() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  // 할 일 추가
  const addTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInputValue("");
  };

  // 완료 처리
  const completeTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  // 삭제
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <input
        id="todo-input"
        type="text"
        placeholder="새로운 할 일을 입력하세요."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onCompositionStart={() => setIsComposing(true)}   // 한글 조합 시작
        onCompositionEnd={() => setIsComposing(false)}    // 한글 조합 종료
        onKeyDown={(e) => {
          if (e.key === "Enter" && !isComposing) {
            e.preventDefault();
            if (inputValue.trim() !== "") addTodo();
          }
        }}
      />
      <button id="add-button" type="button" onClick={addTodo}>
        추가
      </button>

      <h2>해야 할 일</h2>
      <ul id="todo-list">
        {todos
          .filter((todo) => !todo.completed)
          .map((todo) => (
            <li key={todo.id}>
              <span style={{color:'black'}}>{todo.text}</span>
              <button className="complete-button" onClick={() => completeTodo(todo.id)}>완료</button>
              <button className="delete-button" onClick={() => deleteTodo(todo.id)}>삭제</button>
            </li>
          ))}
      </ul>

      <h2>완료된 일</h2>
      <ul id="completed-list">
        {todos
          .filter((todo) => todo.completed)
          .map((todo) => (
            <li key={todo.id}>
              <span style={{ textDecoration: "line-through" }}>
                {todo.text}
              </span>
              <button className="delete-button" onClick={() => deleteTodo(todo.id)}>삭제</button>
            </li>
          ))}
      </ul>
      </>
  );
}
