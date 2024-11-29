// src/components/RoleButtons.js
import React from 'react';
import { useUser } from '../contexts/UserContext';
import './RoleButtons.css';

const RoleButtons = () => {
    const { setUserRole } = useUser();

    return (
        <div className="roles" id='roleButtons'>
            <button onClick={() => setUserRole('general')}>General</button>
            <button onClick={() => setUserRole('usuario')}>Usuario</button>
        </div>
    );
};

export default RoleButtons;