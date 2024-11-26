import React from "react";
import './Footer.css'; // Asegúrate de importar el archivo CSS


const Footer = () => {
  const teamMembers = [
    {
      name: "Catalina Clavijo",
      role: "Desarrolladora",
      linkedin: "https://www.linkedin.com/in/cataclas/",
      image: `${process.env.PUBLIC_URL}/catalina_clavijo.jpg`, // Ruta de la imagen
    },
    {
      name: "Cristhian Santamaria",
      role: "Desarrollador",
      linkedin: "https://www.linkedin.com/in/miembro2/",
      image: `${process.env.PUBLIC_URL}/cristhian_santamaria.jpeg`, // Ruta de la imagen
    },
    {
      name: "César Peláez",
      role: "Arquiecto",
      linkedin: "https://www.linkedin.com/in/cpelaezp/",
      image: `${process.env.PUBLIC_URL}/cesar_pelaez.jpg`, // Ruta de la imagen
    }
  ];

  return (
    <footer className="footer" id="contacto">
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="member-link">
              <div className="member-image" style={{ backgroundImage: `url(${member.image})` }}></div>
              <div className="member-details">
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
              <i className="fab fa-linkedin linkedin-icon fa-2x"></i>
            </a>
          </div>
        ))}
      </div>
      <p className="rights">&copy; 2024 AgroHack. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
