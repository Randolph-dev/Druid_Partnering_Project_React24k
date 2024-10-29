import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Contact from './components/Contact';
import Layout from './pages/Layout';
import fetchJsonApiLinksFromDrupal from './lib/drupal/drupal-api';
import { useAppDispatch } from './hooks/hooks';
import Cases from './components/Cases';
import Blog from './components/Blog';
import Projects from './components/Projects';
import Jobs from './components/Jobs';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchJsonApiLinksFromDrupal());
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="projects" element={<Projects />} />
          <Route path="cases" element={<Cases />} />
          <Route path="services" element={<Services />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;