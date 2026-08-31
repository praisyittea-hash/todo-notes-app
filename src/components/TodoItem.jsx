export default function TodoItem({ todo, onToggle, onDelete, onStartEdit }) {
  return (
    <li className={todo.completed ? 'todo-item completed' : 'todo-item'}>
      <div className="todo-main">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <div className="todo-text-group">
          <span className="todo-title">{todo.title}</span>
          {todo.dueDate && (
            <span className="todo-due-date">Due: {todo.dueDate}</span>
          )}
        </div>
      </div>

      <div className="todo-right">
        <span className={todo.completed ? 'status-badge completed' : 'status-badge pending'}>
          {todo.completed ? 'Completed' : 'Pending'}
        </span>
        <button
          type="button"
          className="btn-edit"
          onClick={() => onStartEdit(todo)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn-delete"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
