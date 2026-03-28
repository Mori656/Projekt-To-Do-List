import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li>Dashboard</li>
        <li>Tasks</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;