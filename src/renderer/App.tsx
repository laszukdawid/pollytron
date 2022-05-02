import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Config from './Config'
import routes from '../constants/routes.json';
import './App.css';
import Home from "./Home";
import Shortcuts from "./Shortcuts";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path={routes.CONFIG} element={<Config />} />
        <Route path={routes.SHORTCUTS} element={<Shortcuts />} />
        {/* This needs to be the last, otherwise all falls under / */}
        <Route path={routes.HOME} element={<Home />} />
      </Routes>
    </Router>
  );
}
