import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling, faDollarSign, faLeaf, faChartLine, faFilter } from "@fortawesome/free-solid-svg-icons";
import ChartAnalysis from "./ChartAnalysis"; // Nuevo componente
import { useUser } from "../contexts/UserContext";
import roleConfigDashboard from "../config/rolConfigDashboard";

import "./Dashboard.css";

// Registrar los tipos de gráficos
ChartJS.register(...registerables);

const Dashboard = () => {
    const { role } = useUser();
    const roleData = roleConfigDashboard[role]?.dashboard || {};
    const { userRole } = useUser();
    const [selectedChart, setSelectedChart] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1240); // Detecta si es móvil
    const [showFiltersModal, setShowFiltersModal] = useState(false); // Controla el modal
    const [filters, setFilters] = useState({
        departamento: "",
        municipio: "",
        fechaInicio: "",
        fechaFin: "",
    });

    // Manejar cambios en los filtros
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const toggleModal = () => setShowFiltersModal(!showFiltersModal);

    // Listener para ajustar el estado en caso de resize
    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1240);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Datos de las gráficas
    const charts = [
        {
            id: "bar",
            title: "Producción Mensual",
            data: {
                labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
                datasets: [
                    {
                        label: "Producción agrícola (Toneladas)",
                        data: [120, 190, 80, 150, 200, 170],
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                    },
                ],
            },
            component: Bar,
        },
        {
            id: "line",
            title: "Ingresos Anuales",
            data: {
                labels: ["2020", "2021", "2022", "2023"],
                datasets: [
                    {
                        label: "Incremento de ingresos (%)",
                        data: [20, 30, 25, 35],
                        borderColor: "rgba(54, 162, 235, 1)",
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                    },
                ],
            },
            component: Line,
        },
        {
            id: "pie",
            title: "Distribución de Cultivos",
            data: {
                labels: ["Maíz", "Trigo", "Cebada", "Avena"],
                datasets: [
                    {
                        data: [40, 25, 20, 15],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(54, 162, 235, 0.6)",
                            "rgba(255, 206, 86, 0.6)",
                            "rgba(75, 192, 192, 0.6)",
                        ],
                    },
                ],
            },
            component: Pie,
        },
    ];

    // Indicadores (Tarjetas)
    const indicators = [
        {
            id: "indicator-1",
            name: "Producción Total",
            icon: faSeedling,
            value: "1,500 Toneladas",
            color: "#4CAF50", // verde
        },
        {
            id: "indicator-2",
            name: "Ingresos Totales",
            icon: faDollarSign,
            value: "$1,200,000",
            color: "#FF9800", // naranja
        },
        {
            id: "indicator-3",
            name: "Cultivos Activos",
            icon: faLeaf,
            value: "300 Cultivos",
            color: "#2196F3", // azul
        },
        {
            id: "indicator-4",
            name: "Crecimiento Anual",
            icon: faChartLine,
            value: "15%",
            color: "#FF5722", // rojo
        },
    ];

    const Filters = ({ filters, handleFilterChange }) => (
        <div className="filters-container">
            <div className="form-group">
                <label htmlFor="departamento">Departamento</label>
                <select
                    id="departamento"
                    name="departamento"
                    value={filters.departamento}
                    onChange={handleFilterChange}
                >
                    <option value="">Seleccione un departamento</option>
                    <option value="cundinamarca">Cundinamarca</option>
                    <option value="antioquia">Antioquia</option>
                    <option value="valle">Valle del Cauca</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="municipio">Municipio</label>
                <select
                    id="municipio"
                    name="municipio"
                    value={filters.municipio}
                    onChange={handleFilterChange}
                >
                    <option value="">Seleccione un municipio</option>
                    <option value="bogota">Bogotá</option>
                    <option value="medellin">Medellín</option>
                    <option value="cali">Cali</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="fechaInicio">Fecha Inicio</label>
                <input
                    type="date"
                    id="fechaInicio"
                    name="fechaInicio"
                    value={filters.fechaInicio}
                    onChange={handleFilterChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="fechaFin">Fecha Fin</label>
                <input
                    type="date"
                    id="fechaFin"
                    name="fechaFin"
                    value={filters.fechaFin}
                    onChange={handleFilterChange}
                />
            </div>

            <button className="filter-button" onClick={() => console.log("Aplicar Filtros")}>
                Aplicar Filtros
            </button>
        </div>
    );

    return (
        <div className="dashboard">
            <h2>Dashboard - {role}</h2>

            {/* Botón para abrir modal en móvil */}
            {isMobile && (
                <FontAwesomeIcon
                    icon={faFilter}
                    className="filter-icon"
                    onClick={toggleModal}
                    title={showFiltersModal ? "Cerrar filtros" : "Abrir filtros"}
                />
            )}

            {/* Modal para filtros */}
            {showFiltersModal && isMobile && (
                <div className="modal">
                    <div className="modal-content">
                        <h4 className="modal-title">Filtros</h4>
                        <button className="close-button" onClick={toggleModal}>×</button>
                        <Filters filters={roleData.filters || []} handleFilterChange={() => { }} />
                    </div>
                </div>
            )}

            {/* Filtros normales para escritorio */}
            {!isMobile && <Filters filters={roleData.filters || []} handleFilterChange={() => { }} />}

            {/* Tarjetas de Indicadores */}
            <div className="indicators-container">
                {roleData.indicators?.map((indicator) => (
                    <div
                        key={indicator.id}
                        className="indicator-card"
                        style={{ borderLeft: `.5rem solid ${indicator.color}` }}
                    >
                        <FontAwesomeIcon
                            icon={indicator.icon || faFilter} // Si tienes íconos en los indicadores
                            className="indicator-icon"
                            style={{ color: indicator.color, height: "50px" }}
                        />
                        <div className="indicator-info">
                            <h3>{indicator.name}</h3>
                            <p className="indicator-value">{indicator.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Gráficas y análisis */}
            <div className="dashboard-layout">
                <div className="charts-container">
                    {roleData.charts?.map((chart) => (
                        <div
                            key={chart.id}
                            className={`chart ${selectedChart?.id === chart.id ? "chart-selected" : ""}`}
                            onClick={() => setSelectedChart(chart)}
                        >
                            <h3>{chart.title}</h3>
                            {chart.id === "bar" && <Bar data={chart.data} />}
                            {chart.id === "line" && <Line data={chart.data} />}
                            {chart.id === "pie" && <Pie data={chart.data} />}
                        </div>
                    ))}
                </div>
                <div className="analysis-container">
                    {selectedChart ? (
                        <ChartAnalysis chart={selectedChart} />
                    ) : (
                        <p>Seleccione una gráfica para ver el análisis.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
