import type { TTodo } from '../types/todo';

interface Props {
  todo: TTodo;
  onAction: () => void;
  actionLabel: string;
}

function TodoItem({ todo, onAction, actionLabel }: Props) {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{todo.text}</span>
      <button onClick={onAction} className="render-container__item-button">
        {actionLabel}
      </button>
    </li>
  );
}

export default TodoItem;
