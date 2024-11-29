import React from "react";
import LandingPage from "./pages/LandingPage";
import Notificaciones from "./pages/Notificaciones";
import Dashboard from "./pages/Dashboard";
import RegisterPage from "./pages/RegisterPage";
import CertificadosPage from "./pages/QrValidationPage";
import TiendaPage from "./pages/TiendaPage";
import MapPage from "./pages/MapPage";
import GestionPage from "./pages/GestionPage";
import PerfilPage from "./pages/PerfilPage";
import IncidentReportPage from "./pages/IncidentReportPage";
import MonitoreoPage from "./pages/MonitoreoPage";
import { HashRouter, Routes, Route } from "react-router-dom";

import { UserProvider } from './contexts/UserContext';
import RoleButtons from './components/RoleButtons';  // Componente para cambiar el rol

import './App.css';

function App() {
  return (
    <UserProvider>
      <HashRouter>
        <RoleButtons /> {/* Agrega los botones para cambiar el rol aquí */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/mapa" element={<MapPage />} />
          <Route path="/certificados" element={<CertificadosPage />} />
          <Route path="/tienda" element={<TiendaPage />} />
          <Route path="/gestion" element={<GestionPage />} />
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/monitoreo" element={<MonitoreoPage />} />
          <Route path="/registro-incidentes" element={<IncidentReportPage />} />

        </Routes>
      </HashRouter>
    </UserProvider>
  );
}


export default App;
