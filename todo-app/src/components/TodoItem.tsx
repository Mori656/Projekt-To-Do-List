import { Shield, Trash2 } from "lucide-react";

type TodoItemProps = {
  task: string;
  date: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TodoItem({
  task,
  date,
  completed,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <div className="flex items-center justify-between bg-blue rounded-xl px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3 bg-black">
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
          className="w-4 h-4"
        />

        <div>
          <p className={`font-medium ${completed ? "line-through text-gray-400" : ""}`}>
            {task}
          </p>
          <p className="text-sm text-gray-500">Date {date}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-blue-600">
        <Shield className="w-5 h-5" />
        <button onClick={onDelete}>
          <Trash2 className="w-5 h-5 hover:text-red-500 transition" />
        </button>
      </div>
    </div>
  );
}