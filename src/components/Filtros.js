import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Filtros.css";

const Filtros = ({ onApplyFilters }) => {
    const [zona, setZona] = useState("");
    const [horas, setHoras] = useState([6, 18]); // Rango por defecto: 6 AM a 6 PM
    const [tipoEvento, setTipoEvento] = useState("");

    const handleApplyFilters = () => {
        // Solo llamar al callback si onApplyFilters existe
        if (onApplyFilters) {
            onApplyFilters({ zona, horas, tipoEvento });
        }
    };

    return (
        <div className="filtros-panel">
            <h3>Filtros</h3>
            <div className="filtro-item">
                <label htmlFor="zona">Zona:</label>
                <select id="zona" value={zona} onChange={(e) => setZona(e.target.value)}>
                    <option value="">Todas</option>
                    <option value="norte">Norte</option>
                    <option value="sur">Sur</option>
                    <option value="este">Este</option>
                    <option value="oeste">Oeste</option>
                </select>
            </div>
            <div className="filtro-item">
                <label>Horario:</label>
                <div className="slider-container">
                    <Slider
                        range
                        min={0}
                        max={24}
                        step={1}
                        value={horas}
                        onChange={(value) => setHoras(value)}
                        marks={{
                            0: "00:00",
                            6: "06:00",
                            12: "12:00",
                            18: "18:00",
                            24: "24:00",
                        }}
                        tipFormatter={(value) => `${value}:00`}
                    />
                </div>
                <p>
                    Horario seleccionado: {horas[0]}:00 - {horas[1]}:00
                </p>
            </div>
            <div className="filtro-item">
                <label htmlFor="tipoEvento">Tipo de Evento:</label>
                <select id="tipoEvento" value={tipoEvento} onChange={(e) => setTipoEvento(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="concierto">Hurto a persona</option>
                    <option value="concierto">Hurto a comercio</option>
                    <option value="teatro">Accidente</option>
                    <option value="exposición">Zona insegura</option>
                </select>
            </div>
            <button className="apply-filters" onClick={handleApplyFilters}>Aplicar Filtros</button>
        </div>
    );
};

export default Filtros;
