import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MenuLateral from "../components/MenuLateral";
import TablaCRUD from "../components/TablaCRUD";
import { useUser } from '../contexts/UserContext';
import roleConfigGestion from '../config/rolConfigGestion';

import './GestionPage.css';

const GestionPage = () => {
  const { role } = useUser();
  const roleConfig = roleConfigGestion[role] || { menu: [], data: {} };

  const [currentTable, setCurrentTable] = useState(null);

  const handleMenuSelect = (key) => {
    setCurrentTable(roleConfig.data[key] || null);
  };

  return (
    <div id="gestion">
      <Header />
      <div className="contenido">
        <MenuLateral menu={roleConfig.menu} onSelect={handleMenuSelect} />
        <div className="tabla-crud">
          {currentTable ? (
            <TablaCRUD columns={currentTable.columns} data={currentTable.data} />
          ) : (
            <p>Selecciona una opción del menú</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GestionPage;
