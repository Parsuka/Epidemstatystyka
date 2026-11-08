import { BrowserRouter, Route, Routes } from 'react-router';
import ThemeProvider from './context/ThemeProvider';
import FiltersProvider from './context/FiltersProvider';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import CountryPage from './pages/CountryPage';
import NotFoundPage from './pages/NotFoundPage';
import { ROUTES } from './utils/routes';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <FiltersProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path={ROUTES.country} element={<CountryPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FiltersProvider>
    </ThemeProvider>
  );
}

export default App;
