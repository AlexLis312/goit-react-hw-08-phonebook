import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ContactsPage from './pages/ContactsPage';
import Navigation from './components/Navigation';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/contacts"
          element={
            <PrivateRoute>
              <ContactsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
