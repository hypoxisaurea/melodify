import React from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import Splash from './pages/Splash';
import InputPage from './pages/InputPage';
import OutputPage from './pages/OutputPage';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Splash />} />
        <Route path="/select" element={<InputPage />} />
        <Route path="/output/:fileId" element={<OutputPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
