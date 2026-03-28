import React from 'react';

const AppHeader: React.FC = () => {
  return (
    <header className="app-header">
      <h1>Todo App Dashboard</h1>
      <nav>
        <button>Home</button>
        <button>Profile</button>
      </nav>
    </header>
  );
};

export default AppHeader;