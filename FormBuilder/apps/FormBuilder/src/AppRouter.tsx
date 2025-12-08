import { Routes, Route } from 'react-router-dom';
import FormLibraryPage from './pages/FormLibraryPage';
import FormResponsesPage from './pages/FormResponsesPage';
import FormFillPage from './pages/FormFillPage';
import Layout from './Components/Layout/Layout';
import BuilderPage from './pages/BuilderPage';

export default function AppRouter() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={ <BuilderPage/>} />
        <Route path="/forms" element={<FormLibraryPage />} />
        <Route path="/forms/:id/responses" element={<FormResponsesPage />} />
        <Route path="/fill" element={<FormFillPage />} />
      </Routes>
    </Layout>
    
    
  );
}





