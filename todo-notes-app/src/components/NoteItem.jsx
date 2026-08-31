export default function NoteItem({ note, onDelete, onStartEdit }) {
  return (
    <div className="note-card">
      <div className="note-card-header">
        <h3 className="note-title">{note.title}</h3>
        <span className="category-badge">{note.category}</span>
      </div>

      <p className="note-content">{note.content}</p>

      <div className="note-card-footer">
        <small className="note-time">{note.createdAt}</small>
        <div className="note-actions">
          <button
            type="button"
            className="btn-edit"
            onClick={() => onStartEdit(note)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn-delete"
            onClick={() => onDelete(note.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
