import React from "react";
import "./Notificaciones.css";

const Notificaciones = ({ notifications }) => {
    return (
        <div className="container" id="notificaciones">
            <div className="notificaciones-container">
                <div className="notificaciones-header">
                    <h2>Notificaciones</h2>
                    <button className="btn-mark-all">Marcar todo como leído</button>
                </div>
                <ul className="notificaciones-list">
                    {notifications.map((noti, index) => (
                        <li key={index} className={`notificacion-item ${noti.unread ? "unread" : ""}`}>
                            <div className="noti-image">
                                <i className="fas fa-leaf"></i> 
                            </div>
                            <div className="noti-content">
                                <strong>{noti.title}</strong>
                                <p>{noti.message}</p>
                                {noti.detail && <small className="noti-detail">{noti.detail}</small>}
                                <span className="noti-time">{noti.time}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="ver-mas">
                    <a href="#ver-mas">Ver más</a>
                </div>
            </div>
        </div>
    );
};

export default Notificaciones;
