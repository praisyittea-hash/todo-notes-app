import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('my_todos');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 1, title: 'Learn React Hooks and State', dueDate: '2026-09-02', completed: true },
      { id: 2, title: 'Build Week 4 Minor Project', dueDate: '2026-09-05', completed: false },
      { id: 3, title: 'Submit assignment on LMS', dueDate: '2026-09-06', completed: false }
    ];
  });

  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('All');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem('my_todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editId) {
      setTodos(
        todos.map((item) =>
          item.id === editId ? { ...item, title: text.trim(), dueDate } : item
        )
      );
      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        title: text.trim(),
        dueDate,
        completed: false
      };
      setTodos([...todos, newTodo]);
    }

    setText('');
    setDueDate('');
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
    if (editId === id) {
      setEditId(null);
      setText('');
      setDueDate('');
    }
  };

  const handleStartEdit = (todo) => {
    setEditId(todo.id);
    setText(todo.title);
    setDueDate(todo.dueDate || '');
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setText('');
    setDueDate('');
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'Completed') return todo.completed;
    if (filter === 'Pending') return !todo.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>To-Do App</h2>
        <div className="status-summary">
          <span>Total: {todos.length}</span>
          <span>Pending: {pendingCount}</span>
          <span>Completed: {completedCount}</span>
        </div>
      </div>

      <form className="form-box" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="input-field"
            placeholder="Enter task name..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <input
            type="date"
            className="input-date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button type="submit" className="btn-primary">
            {editId ? 'Update Task' : 'Add Task'}
          </button>
          {editId && (
            <button type="button" className="btn-cancel" onClick={handleCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="filter-bar">
        <button
          type="button"
          className={filter === 'All' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('All')}
        >
          All ({todos.length})
        </button>
        <button
          type="button"
          className={filter === 'Pending' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('Pending')}
        >
          Pending ({pendingCount})
        </button>
        <button
          type="button"
          className={filter === 'Completed' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('Completed')}
        >
          Completed ({completedCount})
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <p className="empty-message">No tasks found in this view.</p>
      ) : (
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onStartEdit={handleStartEdit}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
