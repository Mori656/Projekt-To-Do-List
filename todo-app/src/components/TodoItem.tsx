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
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px",
      border: "1px solid #a0927d",
      borderRadius: "12px",
      background: "#f5f1e8",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      marginBottom: "16px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          onClick={onToggle}
          style={{
            width: "24px",
            height: "24px",
            border: "2px solid #a0927d",
            borderRadius: "4px",
            background: completed ? "#7a8f6b" : "#f5f1e8",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: "0",
            flexShrink: 0
          }}
        >
          {completed && <Check size={16} color="white" />}
        </button>

        <div>
          <p style={{
            textDecoration: completed ? "line-through" : "none",
            margin: "0 0 4px 0",
            fontSize: "16px",
            fontWeight: "500",
            textAlign: "left"
          }}>
            {task}
          </p>
          <p style={{
            fontSize: "14px",
            color: "#6b7280",
            margin: "0"
          }}>
            {timeLimit}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{
          position: "relative",
          width: "32px",
          height: "32px"
        }}>
          <Shield size={32} color="#a0927d" />
          <span style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: "bold",
            fontSize: "12px",
            color: "#5a4a3a"
          }}>
            {importance}
          </span>
        </div>

        <button onClick={onEdit} style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px",
          borderRadius: "4px",
          color: "#8b7355"
        }}>
          ✏️
        </button>
        <button onClick={onDelete} style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px",
          borderRadius: "4px",
          color: "#8b7355"
        }}>
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}