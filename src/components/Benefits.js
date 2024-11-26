import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faSeedling,
  faChartLine,
  faLifeRing,
} from "@fortawesome/free-solid-svg-icons";

const Benefits = () => {
  const benefits = [
    {
      icon: faHandshake,
      title: "Conexión \nDirecta",
      description:
        "Facilitamos el contacto entre agricultores y compradores sin intermediarios.",
      iconColor: "#7C9A92", // Color relacionado con agricultura
    },
    {
      icon: faChartLine,
      title: "Aumento de \nProductividad",
      description:
        "Accede a herramientas y recursos tecnológicos para optimizar tus cultivos.",
      iconColor: "#2E8B57", // Verde más oscuro, asociado a crecimiento y agricultura
    },
    {
      icon: faSeedling,
      title: "Mercado \n Sostenible",
      description:
        "Promovemos prácticas responsables que cuidan del medio ambiente.",
      iconColor: "#6B8E23", // Verde oliva, simboliza sostenibilidad
    },
    {
      icon: faLifeRing,
      title: "Soporte \nContinuo",
      description:
        "Asistencia técnica para maximizar tu éxito en cada etapa.",
      iconColor: "#FFD700", // Amarillo dorado, que simboliza apoyo y cuidado
    },
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
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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
