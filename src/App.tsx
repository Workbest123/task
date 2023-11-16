import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PeopleList from './components/PeopleList';
import PersonDetails from './components/PersonDetails';
import Favorites from './components/Favorites';
import Peoples from './components/Peoples'

const AppRouter: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PeopleList />} />
      <Route path="/peoples" element={<Peoples />} />
      <Route path="/peoples/:id" element={<PersonDetails />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  </Router>
);

export default AppRouter;
