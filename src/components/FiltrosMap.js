import React from "react";

const FiltrosMap = ({ filtros, onFilterChange }) => {
    return (
        <div className="filtros-container">
            <h3>Filtros</h3>
            {Object.keys(filtros).map((key) => (
                <div key={key} className="filtro-group">
                    <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                    <select onChange={(e) => onFilterChange(key, e.target.value)}>
                        <option value="">Todos</option>
                        {filtros[key].map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
};

export default FiltrosMap;
