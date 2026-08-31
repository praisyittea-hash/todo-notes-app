import { useState } from 'react';
import Navbar from './components/Navbar';
import TodoApp from './components/TodoApp';
import NotesApp from './components/NotesApp';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('todos');

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-wrapper">
        {activeTab === 'todos' ? <TodoApp /> : <NotesApp />}
      </main>
      <footer className="footer">
        <p>Week 04 Minor Project &bull; React.js Fundamentals</p>
      </footer>
    </div>
  );
}
