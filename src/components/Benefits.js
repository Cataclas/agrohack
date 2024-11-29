import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faSearch,
  faUsers,
  faDatabase,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";

const Benefits = () => {
  const benefits = [
    {
      icon: faShieldAlt, // Icono de escudo, representando seguridad
      title: "Seguridad \nInmediata",
      description:
        "Permite a los ciudadanos reportar incidentes en tiempo real, mejorando la capacidad de respuesta de las autoridades.",
      iconColor: "#1E3A8A", // Azul oscuro, asociado con seguridad y confianza
    },
    {
      icon: faSearch, // Icono de lupa, simbolizando análisis
      title: "Análisis \nPredictivo",
      description:
        "Nuestra inteligencia artificial identifica patrones y genera mapas de calor, permitiendo anticipar y prevenir incidentes.",
      iconColor: "#4B8B3B", // Verde, relacionado con inteligencia artificial y crecimiento
    },
    {
      icon: faUsers, // Icono de personas, representando colaboración
      title: "Colaboración \nCiudadana",
      description:
        "Fomentamos la participación activa de los ciudadanos para mejorar la seguridad colectiva mediante la colaboración y transparencia.",
      iconColor: "#F59E0B", // Naranja, relacionado con la acción y el compromiso
    },
    {
      icon: faDatabase, // Icono de bloque de cadena, representando la tecnología blockchain
      title: "Transparencia \nTotal",
      description:
        "El uso de blockchain garantiza la transparencia en la recopilación y procesamiento de los datos, asegurando confianza entre ciudadanos y autoridades.",
      iconColor: "#6366F1", // Azul morado, simboliza innovación y transparencia
    },
    {
      icon: faCloud, // Icono de nube, asociado con tecnología en la nube
      title: "Escalabilidad \nGlobal",
      description:
        "Nuestra solución está basada en la nube, lo que permite expandirla fácilmente a cualquier ciudad o región sin limitaciones de infraestructura.",
      iconColor: "#10B981", // Verde claro, asociado con crecimiento y tecnología
    }

  ];

  return (
    <section style={styles.section} id="beneficios">
      <h2 style={styles.title}>¿Por qué elegir nuestra plataforma?</h2>
      <div style={styles.grid}>
        {benefits.map((benefit, index) => (
          <div key={index} style={styles.card}>
            <FontAwesomeIcon
              icon={benefit.icon}
              style={{ ...styles.icon, backgroundColor: benefit.iconColor }} // Aplica el color dinámico
              size="3x"
            />
            <h3 style={styles.cardTitle}>
              {benefit.title.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}</h3>
            <p style={styles.description}>{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};


const styles = {
  section: {
    padding: "30px 20px",
    backgroundColor: "#f4f4f4",
    color: "#356859",
    textAlign: "center",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "3rem",
    marginTop: "2rem",
    padding: "5rem",
    width: "70%",
    margin: "auto",
  },
  card: {
    padding: "2rem",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    position: "relative",
  },
  icon: {
    color: "white",
    borderRadius: "20rem",
    padding: "15px",
    position: "absolute",
    top: "-2rem",
    left: "0",
    height: "40px",
    width: "40px",
    margin: "0 2rem",
  },
  cardTitle: {
    fontSize: "1.5rem",
    margin: "10px 0",
  },
  description: {
    fontSize: "large",
    lineHeight: "1.5",
  },
};

export default Benefits;
