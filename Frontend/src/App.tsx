import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Contact from './components/Contact';
import Layout from './pages/Layout';
import fetchJsonApiLinksFromDrupal from './lib/drupal/drupal-api';
import WorkingWithUs from './components/WorkingWithUs';
import Cases from './components/Cases';  

const App: React.FC = () => {
  fetchJsonApiLinksFromDrupal();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="cases" element={<Cases />} />      
          <Route path="services" element={<Services />} />
          <Route path="working-with-us" element={<WorkingWithUs />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;