import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Contact from './components/Contact';
import Layout from './pages/Layout';
import fetchAllFromDrupal from './lib/drupal/drupal-api';

const App: React.FC = () => {
  fetchAllFromDrupal();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
      <footer>
        <p>Footer content here</p>
      </footer>
    </Router>
  );
};

export default App;