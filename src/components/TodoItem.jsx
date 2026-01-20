import { formatDateTime } from '../utils/dateUtils';

const TodoItem = ({ todo, folders, onToggle, onDelete }) => {
  const folder = folders.find(f => f.id === todo.folderId);

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-checkbox-wrapper">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
      </div>

      <div className="todo-content">
        <div className="todo-header">
          {folder && (
            <span className="todo-folder-badge" style={{ backgroundColor: folder.color }}>
              {folder.name}
            </span>
          )}
          <h4 className="todo-title">{todo.title}</h4>
        </div>
        {todo.memo && <p className="todo-memo">{todo.memo}</p>}
        <div className="todo-meta">
          <span className="todo-date">
            📅 {formatDateTime(todo.dueDate, todo.dueTime)}
          </span>
        </div>
      </div>

      <button className="todo-delete-btn" onClick={() => onDelete(todo.id)}>
        ✕
      </button>
    </div>
  );
};

export default TodoItem;
