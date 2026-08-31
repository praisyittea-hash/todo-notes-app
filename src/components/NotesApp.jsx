import { useState, useEffect } from 'react';
import NoteItem from './NoteItem';

export default function NotesApp() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('my_notes');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: 1,
        title: 'React Basics',
        content: 'Functional components return JSX. Hooks like useState manage state inside components.',
        category: 'Study',
        createdAt: '8/31/2026, 7:30 PM'
      },
      {
        id: 2,
        title: 'Project Submission Checklist',
        content: 'Check components folder, check responsive CSS, test local storage, and update README.',
        category: 'Work',
        createdAt: '8/31/2026, 7:45 PM'
      },
      {
        id: 3,
        title: 'Weekend Project Idea',
        content: 'Build a weather app using free OpenWeatherMap API and custom CSS.',
        category: 'Ideas',
        createdAt: '8/31/2026, 8:00 PM'
      }
    ];
  });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Study');
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    localStorage.setItem('my_notes', JSON.stringify(notes));
  }, [notes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    const timeString = new Date().toLocaleString([], {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    if (editId) {
      setNotes(
        notes.map((item) =>
          item.id === editId
            ? { ...item, title: title.trim() || 'Untitled Note', content, category, createdAt: timeString }
            : item
        )
      );
      setEditId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title: title.trim() || 'Untitled Note',
        content,
        category,
        createdAt: timeString
      };
      setNotes([newNote, ...notes]);
    }

    setTitle('');
    setContent('');
    setCategory('Study');
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((item) => item.id !== id));
    if (editId === id) {
      setEditId(null);
      setTitle('');
      setContent('');
    }
  };

  const handleStartEdit = (note) => {
    setEditId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setTitle('');
    setContent('');
    setCategory('Study');
  };

  const categories = ['All', 'Study', 'Work', 'Personal', 'Ideas'];

  const filteredNotes = notes.filter((note) => {
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>Notes App</h2>
        <span className="badge-count">Total Notes: {notes.length}</span>
      </div>

      <form className="form-box" onSubmit={handleSubmit}>
        <div className="note-form-grid">
          <input
            type="text"
            className="input-field"
            placeholder="Note Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="input-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Study">Study</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Ideas">Ideas</option>
          </select>
        </div>

        <textarea
          className="textarea-field"
          placeholder="Write your note here..."
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required={!title.trim()}
        ></textarea>

        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            {editId ? 'Update Note' : 'Add Note'}
          </button>
          {editId && (
            <button type="button" className="btn-cancel" onClick={handleCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="search-filter-section">
        <input
          type="text"
          className="search-input"
          placeholder="Search notes by title or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={selectedCategory === cat ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <p className="empty-message">No notes found matching your search or filter.</p>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onDelete={handleDelete}
              onStartEdit={handleStartEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
