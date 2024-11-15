import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Contact from './components/Contact';
import Layout from './pages/Layout';
import fetchJsonApiLinksFromDrupal from './lib/drupal/drupal-api';
import { useAppDispatch } from './hooks/hooks';
import Blog from './components/Blog';
import Projects from './components/Projects';
import Jobs from './components/Jobs';
import Consultation from './components/Consultation';
import Maintenance from './components/Maintenance';
import { setLoading } from './features/drupalData/drupalSlice';
import { mauticDynamicContents } from './lib/mautic/mauticDynamicContents';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      await dispatch(fetchJsonApiLinksFromDrupal());
      dispatch(setLoading(false));
    };
    fetchData();
  }, []);

  useEffect(() => {
    mauticDynamicContents();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="services" element={<Services />} />
          {/* the next 3 routes belongs to types service pages */}
          <Route path="projects" element={<Projects />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="consultation" element={<Consultation />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;