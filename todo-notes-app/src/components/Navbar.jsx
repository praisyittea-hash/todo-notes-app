export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="logo-text">Student Dashboard</h1>
        <div className="nav-buttons">
          <button
            type="button"
            className={activeTab === 'todos' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('todos')}
          >
            To-Do App
          </button>
          <button
            type="button"
            className={activeTab === 'notes' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('notes')}
          >
            Notes App
          </button>
        </div>
      </div>
    </header>
  );
}
