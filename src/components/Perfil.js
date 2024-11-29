import React from "react";
import './Perfil.css'; // Asegúrate de crear este archivo CSS para los estilos

const Perfil = () => {
    const user = {
        name: "Catalina Andrea Clavijo Sánchez",
        email: "catalina.clavijo@email.com",
        phone: "+57 320 987 6543", // Número telefónico más local
        address: "Carrera 15 #45-78, Chapinero",
        joined: "Abril 2024",
        role: "Ciudadana Activa",
        ciudad: "Bogotá D.C.",
        pais: "Colombia",
        avatar: "./catalina_clavijo.jpg", // Ruta a la imagen de perfil
        incidentsReported: 23, // Número de incidentes reportados por el usuario
        verified: true, // Estado de verificación del usuario
        organization: "Hackathon Seguridad Ciudadana",
        skills: [
            "Reporte de incidentes",
            "Análisis de datos ciudadanos",
            "Colaboración comunitaria"
        ],
    };

    return (
        <div className="perfil-container">
            <div className="perfil-header">
                <img src={user.avatar} alt="Avatar" className="perfil-avatar" />
                <div>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <p>{user.verified ? "Usuario Verificado ✅" : "Usuario no verificado 🚩"}</p>
                </div>
            </div>
            <div className="perfil-details">
                <h3>Detalles del Perfil</h3>
                <table className="perfil-table">
                    <tbody>
                        <tr>
                            <td><strong>Rol:</strong></td>
                            <td>{user.role}</td>
                        </tr>
                        <tr>
                            <td><strong>Teléfono:</strong></td>
                            <td>{user.phone}</td>
                        </tr>
                        <tr>
                            <td><strong>País:</strong></td>
                            <td>{user.pais}</td>
                        </tr>
                        <tr>
                            <td><strong>Ciudad:</strong></td>
                            <td>{user.ciudad}</td>
                        </tr>
                        <tr>
                            <td><strong>Dirección:</strong></td>
                            <td>{user.address}</td>
                        </tr>
                        <tr>
                            <td><strong>Miembro desde:</strong></td>
                            <td>{user.joined}</td>
                        </tr>
                        <tr>
                            <td><strong>Incidentes Reportados:</strong></td>
                            <td>{user.incidentsReported}</td>
                        </tr>
                        <tr>
                            <td><strong>Organización:</strong></td>
                            <td>{user.organization}</td>
                        </tr>
                        <tr>
                            <td><strong>Habilidades:</strong></td>
                            <td>
                                <ul>
                                    {user.skills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Perfil;
