// src/components/Register.js
import React, { useState } from 'react';
import './Register.css';
import { FaUser, FaEnvelope, FaLock, FaUserTag } from 'react-icons/fa';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
    };

    return (
        <div className="container" id='registro'>
            <div className="register-form">
                <h2>¡Regístrate!</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <FaUser className="icon" />
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Nombre completo"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <FaEnvelope className="icon" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={formData.email}
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
                    <div className="form-group">
                        <FaUserTag className="icon" />
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione un rol</option>
                            <option value="admin">Administrador</option>
                            <option value="user">Usuario</option>
                            <option value="moderator">Moderador</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-submit">
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
