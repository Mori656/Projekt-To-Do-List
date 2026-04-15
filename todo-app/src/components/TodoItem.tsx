import { Shield, Trash2, Check } from "lucide-react";

type TodoItemProps = {
  task: string;
  timeLimit: string;
  importance: number;
  completed: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function TodoItem({
  task,
  timeLimit,
  importance,
  completed,
  onToggle,
  onEdit,
  onDelete,
}: TodoItemProps) {
  return (
    <div className="todo-item">
      <div className="todo-item__content">
        <button
          onClick={onToggle}
          className={`todo-item__checkbox ${completed ? 'checked' : ''}`}
        >
          {completed && <Check size={16} color="white" />}
        </button>

        <div className="todo-item__text">
          <p className={`todo-item__title ${completed ? 'completed' : ''}`}>
            {task}
          </p>
          <p className="todo-item__time">
            {timeLimit}
          </p>
        </div>
      </div>

      <div className="todo-item__actions">
        <div className="todo-item__importance">
          <Shield size={32} color="#a0927d" />
          <span className="todo-item__importance-value">
            {importance}
          </span>
        </div>

        <button onClick={onEdit} className="todo-item__btn" title="Edytuj">
          ✏️
        </button>
        <button onClick={onDelete} className="todo-item__btn" title="Usuń">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}