import React from "react";
import './Banner.css'; // Asegúrate de importar el archivo CSS

const url_banner = `${process.env.PUBLIC_URL}/landing.jpg`;

const Banner = () => {
  return (
    <section className="banner" id="home">
      <img src={url_banner} alt="Banner" />
      <div className="overlay"></div> {/* Capa con opacidad */}
      <div className="content">
        <h1 className="title">Innovando para una ciudad más segura</h1>
        <p className="subtitle">
          Con tecnología avanzada, empoderamos a los ciudadanos para reportar incidentes en tiempo real y mejorar la seguridad en nuestras comunidades
        </p>
        <div className="actions">
          <a className="botonUno">Descubre más</a>
          <a className="botonDos">Únete ahora</a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
