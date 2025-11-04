import './index.css' 
import { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import DoneList from './components/DoneList';
import type { TTodo } from './types/todo';

// 상태 관리만 담당
function App() {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: TTodo = { id: Date.now(), text };
    setTodos((prev) => [...prev, newTodo]);
  };

  const completeTodo = (todo: TTodo) => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    setDoneTodos((prev) => [...prev, todo]);
  };

  const deleteTodo = (todo: TTodo) => {
    setDoneTodos((prev) => prev.filter((t) => t.id !== todo.id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">Jay Todo</h1>
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onComplete={completeTodo} />
      <DoneList doneTodos={doneTodos} onDelete={deleteTodo} />
    </div>
  );
}

export default App;

