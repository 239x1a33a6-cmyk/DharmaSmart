import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import { AuthProvider } from './context/AuthContext';
import { SurveillanceProvider } from './context/SurveillanceContext';

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <AuthProvider>
        <SurveillanceProvider>
          <AppRoutes />
        </SurveillanceProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
