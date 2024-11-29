import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaLock, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useUser } from '../contexts/UserContext';

import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginFormVisible, setLoginFormVisible] = useState(false); // Controla la visibilidad del formulario de inicio de sesión
  const [formData, setFormData] = useState({ username: "", password: "" }); // Estado para los datos del formulario
  const [settingsMenuVisible, setSettingsMenuVisible] = useState(false); // Controla la visibilidad del menú de configuración
  const { role } = useUser();

  const location = useLocation(); // Obtén la ruta actual

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Actualiza el campo correspondiente en formData
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página
    console.log(formData); // Aquí puedes manejar el envío de datos (por ejemplo, hacer una petición a la API)
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleLoginForm = () => {
    setLoginFormVisible(!loginFormVisible); // Muestra u oculta el formulario
  };

  // Función para agregar la clase active a la ruta correspondiente
  const getNavItemClass = (path) => {
    return location.pathname === path ? 'navItem active' : 'navItem';
  };

  const toggleSettingsMenu = () => {
    setSettingsMenuVisible(!settingsMenuVisible); // Cambia la visibilidad del menú de configuración
  };

  return (
    <header>
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <i className="fas fa-shield-alt"></i>
            Cuidemonos 4.0
          </Link>
        </div>

        {/* Icono de hamburguesa */}
        <button
          className="hamburger-icon"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <div></div>
          <div></div>
          <div></div>
        </button>
      </div>

      {/* Menú desplegable */}
      <div className={`menu ${menuOpen ? "show" : ""}`}>
        <nav>
          {/* Mostrar enlaces según el rol */}
          {role != 'general' && (
            <>
              <Link to="/mapa" className={getNavItemClass("/mapa")}>Confia y Busca</Link>
              <Link to="/dashboard" className={getNavItemClass("/dashboard")}>Analítica</Link>
              <Link to="/monitoreo" className={getNavItemClass("/monitoreo")}>Monitoreo y alertas</Link>
              <Link to="/gestion" className={getNavItemClass("/gestion")}>Gestión</Link>
              <Link to="/registro-incidentes" className={getNavItemClass("/registro-incidentes")}>Registro Incidentes</Link>
              <Link to="/notificaciones" className={getNavItemClass("/notificaciones")}>Notificaciones</Link>
            </>
          )}

          {role === 'general' && (
            <>
              <a href="#home" className="navItem">Home</a>
              <a href="#beneficios" className="navItem">¿Por qué elegirnos?</a>
              <a href="#contacto" className="navItem">Contacto</a>
            </>
          )}
        </nav>
        {role === 'general' && (
          <div className="auth">
            <a
              href="javascript:void(0)"
              className="authItemUno"
              onClick={toggleLoginForm} // Abre o cierra el formulario de inicio de sesión
            >
              Inicia sesión
            </a>
            <Link to="/registro" className="authItemDos">Registrate</Link>
          </div>
        )}
        {/* Menú de configuración para 'usuario' */}
        {role != 'general' && (
          <div id="auth">
            <a
              href="javascript:void(0)"
              className="authItemTres"// Muestra u oculta el menú de configuración
            >
              Catalina A. Clavijo S. {/* Ícono de configuración */}
            </a>
            <div className="logoPerfil"
              onClick={toggleSettingsMenu} >
              <FaCog />
            </div>
            {settingsMenuVisible && (
              <div className="settings-menu">
                <ul>
                  <li><FaUser /><Link to="/perfil">Ver perfil</Link></li>
                  <li><FaCog /> <Link to="/configuracion">Configuración</Link></li>
                  <li><FaSignOutAlt /><Link to="/salir">Cerrar sesión</Link></li>
                </ul>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Formulario de inicio de sesión */}
      {
        loginFormVisible && (
          <div className="container">
            <div className="login-form">
              <h2>Inicia sesión</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <FaUser className="icon" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Usuario"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <FaLock className="icon" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn-submit">
                  Inicia sesión
                </button>
                <div className="password-recovery">
                  <Link to="/recuperar-contraseña">¿Olvidaste tu contraseña?</Link>
                </div>
              </form>
            </div>
          </div>
        )
      }

    </header >
  );
};

export default Header;
