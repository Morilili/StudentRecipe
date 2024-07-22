import React, { useState } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css"
import './css/MainPage.css'


function AdminDashboard() {
  const [navCollapse, setNavCollapse] = useState(false);
  const [smallNavCollapse, setSmallNavCollapse] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Dashboard');

  const navOptions = [
      { id: 'Dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
      { id: 'Users', icon: 'bi-clipboard-pulse', label: 'Users' },
      { id: 'Recipes', icon: 'bi-chat-square-text', label: 'Recipes' },
      { id: 'Reviews', icon: 'bi-gear', label: 'Reviews' },
      { id: 'Settings', icon: 'bi-gear', label: 'Settings' },
      { id: 'Logout', icon: 'bi-power', label: 'Logout' },
  ];

  const renderContent = () => {
      switch (selectedOption) {
          case 'Dashboard':
              return <div>Dashboard Conte</div>;
          case 'Users':
              return <div>Analytics Content</div>;
          case 'Recipes':
              return <div>Messages Content</div>;
          case 'Reviews':
              return <div>review</div>
          case 'Settings':
              return <div>Settings Content</div>;
          case 'Logout':
              return <div>Logout Content</div>;
          default:
              return <div>Select an option</div>;
      }
  };

  return (
      <div>
          <nav className='nav'>
              <div className='logo'>
                  <h2> Student Recipe Admin Dashboard</h2>
                  <i className='bi bi-justify largeDeviceIcon' onClick={e => setNavCollapse(!navCollapse)}></i>
                  <i className='bi bi-justify smallDeviceIcon' onClick={e => setSmallNavCollapse(!smallNavCollapse)}></i>
              </div>
              <ul>
                  <li>NAME</li>
              </ul>
          </nav>
          <div className='flex-container'>
            <div className='sidebar_content'>
                <div className={`${smallNavCollapse ? " smallNav " : ""} sidebar-container ${navCollapse ? "navCollapse" : ""}`}>
                    {navOptions.map(option => (
                        <div key={option.id} className='nav-option option1' onClick={() => setSelectedOption(option.id)}>
                            <i className={`bi ${option.icon}`}></i>
                            <h3>{option.label}</h3>
                        </div>
                    ))}
                </div>
            </div>
            <div className="content">
              {renderContent()}
            </div>   
          </div>
          
          
      </div>
  );
}

export default AdminDashboard