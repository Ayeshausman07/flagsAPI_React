// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import FlagDetailPage from './pages/FlagDetailPage';

function App() {
  return (
    <Router>
           <ScrollToTop />
           
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<HomePage />} /> 
          <Route path="/flag/:countryId" element={<FlagDetailPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
