import 'bootstrap/dist/css/bootstrap.min.css'; // Импорт Bootstrap
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
import { BrowserRouter as Router } from 'react-router-dom';

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);