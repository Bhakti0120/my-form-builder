import { Routes, Route } from 'react-router-dom';
import App from './app/app';
import FormLibraryPage from './pages/FormLibraryPage';
import PublishedFormPage from './pages/PublishedFormPage';
import FormResponsesPage from './pages/FormResponsesPage';
import FormFillPage from './pages/FormFillPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/forms" element={<FormLibraryPage />} />
      {/* <Route path="/form/:label" element={<PublishedFormPage />} /> */}
      <Route path="/forms/:id/responses" element={<FormResponsesPage />} />
      <Route path="/fill" element={<FormFillPage />} />
    </Routes>
  );
}





