import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import AdminPanel from '../Pages/AdminPanel';

const AppRoutes = ({ onPlayAudio }) => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={<Dashboard onPlayAudio={onPlayAudio} />} 
      />
      <Route 
        path="/all" 
        element={<Dashboard onPlayAudio={onPlayAudio} />} 
      />
      <Route 
        path="/:category" 
        element={<Dashboard onPlayAudio={onPlayAudio} />} 
      />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
};

export default AppRoutes;