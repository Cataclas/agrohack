import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Notificaciones from "./pages/Notificaciones";
import Dashboard from "./pages/Dashboard";
import RegisterPage from "./pages/RegisterPage";
import CertificadosPage from "./pages/TiendaPage";
import TiendaPage from "./pages/CertificadosPage";
import MapPage from "./pages/MapPage";
import { UserProvider, useUser } from './contexts/UserContext';
import './App.css';


// Componente para cambiar el rol
const RoleButtons = () => {
  const { setUserRole } = useUser();

  return (
    <div className="roles">
      <button onClick={() => setUserRole('productor')}>Productor</button>
      <button onClick={() => setUserRole('comprador')}>Comprador</button>
      <button onClick={() => setUserRole('distribuidor')}>Distribuidor</button>
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <RoleButtons /> {/* Agrega los botones para cambiar el rol aquí */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/mapa" element={<MapPage />} />
          <Route path="/certificados" element={<CertificadosPage />} />
          <Route path="/tienda" element={<TiendaPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
