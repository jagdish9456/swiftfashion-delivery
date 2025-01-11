import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VRView } from './pages/VRView';
import { VRCategoryView } from './vr/components/VRCategoryView';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VRView />} />
        <Route path="/vr-category/:categoryId" element={<VRCategoryView />} />
      </Routes>
    </Router>
  );
};

export default App;