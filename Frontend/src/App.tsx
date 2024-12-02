import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Contact from './components/Contact';
import Layout from './pages/Layout';
import fetchJsonApiLinksFromDrupal from './lib/drupal/drupal-api';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import Blog from './components/Blog';
import Projects from './components/Projects';
import Jobs from './components/Jobs';
import Consultation from './components/Consultation';
import Maintenance from './components/Maintenance';
import { setLoading, setUserType } from './features/drupalData/drupalSlice';
import { fetchUserSegments } from './lib/mautic/fetchUserSegments';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const jsonApiLinks = useAppSelector((state) => state.drupal.jsonApiLinks);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      await dispatch(fetchJsonApiLinksFromDrupal());
      dispatch(setLoading(false));
    };
    if (!jsonApiLinks.self) {
      fetchData();
    }
  }, []);

  // find the user type from Mautic and store it in redux
  useEffect(() => {
    const setUserSegments = async () => {
      const userSegment = localStorage.getItem('userSegment');
      if (!userSegment) {
        const fetchedUserSegment = await fetchUserSegments();
        localStorage.setItem('userSegment', fetchedUserSegment);
        dispatch(setUserType(fetchedUserSegment));
      } else {
        dispatch(setUserType(userSegment));
      }
    }
    setUserSegments();
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