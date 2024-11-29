// src/contexts/UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto
const UserContext = createContext();

// Proveedor del contexto que envuelve a toda la aplicación
export const UserProvider = ({ children }) => {
  const [role, setRole] = useState('general'); // Role predeterminado

  // Función para cambiar el rol (para efectos de demostración)
  const setUserRole = (newRole) => {
    setRole(newRole);
  };

  return (
    <UserContext.Provider value={{ role, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para acceder al contexto fácilmente en cualquier componente
export const useUser = () => {
  return useContext(UserContext);
};
