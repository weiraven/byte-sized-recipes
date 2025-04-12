import React, { useState } from 'react';
import DashboardCharts from './DashboardCharts';
import '../App.css';

const ChartSidebar = ({ recipes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    height: '100%',
    width: isOpen ? '700px' : '40px',
    backgroundColor: isOpen ? '#ffffff' : '#3c3c3c',
    color: isOpen ? '#333333' : '#ffffff',
    boxShadow: '-2px 0px 5px rgba(0, 0, 0, 0.5)',
    transition: 'width 0.3s ease, background-color 0.3s ease, color 0.3s ease',
    overflow: 'hidden',
    zIndex: 1001,
  };

  const toggleAreaStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '40px',
    height: '100%',
    backgroundColor: '#3c3c3c',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const toggleButtonStyle = {
    width: '30px',
    height: '30px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
  };

  return (
    <div style={sidebarStyle}>

      <div style={toggleAreaStyle}>
        <button style={toggleButtonStyle} onClick={toggleSidebar}>
          <div className="drawer-icon">
            <span className="drawer-line"></span>
            <span className="drawer-line"></span>
            <span className="drawer-line"></span>
          </div>
        </button>
      </div>

      {isOpen && (
        <div style={{ padding: '1rem', overflowY: 'auto', height: '100%', color: '#333333', backgroundColor: '#ffffff' }}>
            <DashboardCharts recipes={recipes} />
        </div>
    )}
    </div>
  );
};

export default ChartSidebar;