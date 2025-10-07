import { useState } from 'react';
import type { FormEvent } from 'react';

interface Props {
  onAdd: (text: string) => void;
}

function TodoInput({ onAdd }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAdd(input.trim());
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-container__form">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="todo-container__input"
        placeholder="할 일 입력"
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
}

export default TodoInput;
