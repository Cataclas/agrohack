import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaLock } from 'react-icons/fa';

import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginFormVisible, setLoginFormVisible] = useState(false); // Controla la visibilidad del formulario de inicio de sesión
  const [formData, setFormData] = useState({ username: "", password: "" }); // Estado para los datos del formulario

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
    // Después de un login exitoso, podrías cerrar el formulario o redirigir al usuario
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

  return (
    <header>
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <i className="fas fa-leaf"></i>
            <b>A</b>gro<b>H</b>elp
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
          <Link to="/" className={getNavItemClass("/")}>Inicio</Link>
          <Link to="/tienda" className={getNavItemClass("/tienda")}>Tienda</Link>
          <Link to="/mapa" className={getNavItemClass("/mapa")}>Mapa</Link>
          <Link to="/dashboard" className={getNavItemClass("/dashboard")}>Datos</Link>
          <Link to="/certificados" className={getNavItemClass("/certificados")}>Certificados</Link>
          <Link to="/notificaciones" className={getNavItemClass("/notificaciones")}>Notificaciones</Link>
        </nav>
        <div className="auth">
          <a
            href="#login"
            className="authItemUno"
            onClick={toggleLoginForm} // Abre o cierra el formulario de inicio de sesión
          >
            Inicia sesión
          </a>
          <Link to="/registro" className="authItemDos">Registrate</Link>
        </div>
      </div>

      {/* Formulario de inicio de sesión */}
      {loginFormVisible && (
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
      )}

    </header>
  );
};

export default Header;
