import ThemeToggle from './ThemeToggle';
import '../styles/layout.css';
import '../styles/main.css';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <header className="header">
        <div className="container header-content">
          <h1>Feedback Collector</h1>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="container main-content">
        {children}
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>Feedback Collector by [Your Name]</p>
          <p className="text-sm">Submitted for Candidate Task</p>
        </div>
      </footer>
    </div>
  );
}