import TodoItem from './TodoItem';
import type { TTodo } from '../types/todo';

interface Props {
  todos: TTodo[];
  onComplete: (todo: TTodo) => void;
}

function TodoList({ todos, onComplete }: Props) {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">할 일</h2>
      <ul className="render-container__list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            actionLabel="완료"
            onAction={() => onComplete(todo)}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
