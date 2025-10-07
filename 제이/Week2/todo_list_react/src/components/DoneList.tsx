import TodoItem from './TodoItem';
import type { TTodo } from '../types/todo';

interface Props {
  doneTodos: TTodo[];
  onDelete: (todo: TTodo) => void;
}

function DoneList({ doneTodos, onDelete }: Props) {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">완료</h2>
      <ul className="render-container__list">
        {doneTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            actionLabel="삭제"
            onAction={() => onDelete(todo)}
          />
        ))}
      </ul>
    </div>
  );
}

export default DoneList;
