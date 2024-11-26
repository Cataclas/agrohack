import React from "react";
import './Banner.css'; // Asegúrate de importar el archivo CSS

const url_banner = `${process.env.PUBLIC_URL}/close-up-soil-sprout.jpg`;

const Banner = () => {
  return (
    <section className="banner" id="home">
      <img src={url_banner} alt="Banner" />
      <div className="overlay"></div> {/* Capa con opacidad */}
      <div className="content">
        <h1 className="title">Transformando el campo con tecnología</h1>
        <p className="subtitle">
          Conecta agricultores con innovación para mejorar el rendimiento, la sostenibilidad y abrir nuevas oportunidades de mercado.
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
