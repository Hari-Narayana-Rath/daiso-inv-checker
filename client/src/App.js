import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import LoginRegister from './LoginRegister';
import Dashboard from './Dashboard';
import theme from './theme';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <h1>Daiso Inventory Checker</h1>
        </header>
        <main>
          {user ? (
            <Dashboard user={user} onLogout={handleLogout} />
          ) : (
            <LoginRegister onLogin={handleLogin} />
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;