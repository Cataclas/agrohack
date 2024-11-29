import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faMapMarkedAlt, faCheckCircle, faSeedling, faUsers, faDollarSign, faLeaf, faChartLine, faFilter, faShoppingCart, faIndustry, faCertificate, faCalculator, faFilePdf, faFileWord, faFileExcel, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ChartAnalysis from "./ChartAnalysis"; // Nuevo componente
import { useUser } from "../contexts/UserContext";
import roleConfigDashboard from "../config/rolConfigDashboard";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";

import "./Dashboard.css";

// Registrar los tipos de gráficos
ChartJS.register(...registerables);

const Dashboard = () => {
    const { role } = useUser();
    const roleData = roleConfigDashboard[role]?.dashboard || {};
    const { userRole } = useUser();
    const [selectedChart, setSelectedChart] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1240); // Detecta si es móvil
    const [showFiltersModal, setShowFiltersModal] = useState(false); // Controla el modal    const [showEmailModal, setShowEmailModal] = useState(false);
    const [analysis, setAnalysis] = useState(""); // Análisis
    const [individualAnalyses, setIndividualAnalyses] = useState([]);
    const [showEmailModal, setShowEmailModal] = useState(false); // Modal

    const [emailData, setEmailData] = useState({
        analysis: "",
        recipients: "",
        schedule: { immediate: true, date: "", recurrence: "" },
    });
    const [recurrenceOptions, setRecurrenceOptions] = useState(["Una vez", "Diaria", "Mensual"]);

    const handleExportPDF = async () => {
        const element = document.querySelector(".dashboard"); // Selecciona el contenedor principal
        const filters = document.querySelector(".filters-container");
        const analysisContainer = document.querySelector(".analysis-container");

        // Ocultar elementos no deseados
        filters.style.display = "none";
        analysisContainer.style.display = "none";

        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
        pdf.save("dashboard.pdf");

        // Restaurar visibilidad de los elementos
        filters.style.display = "";
        analysisContainer.style.display = "";
    };

    const handleExportWord = async () => {
        const element = document.querySelector(".dashboard");
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL("image/png");

        const content = `
            <h1>Dashboard Report</h1>
            <p>Análisis del Dashboard:</p>
            <img src="${imgData}" alt="Dashboard"/>
        `;

        const blob = new Blob(["\ufeff", content], { type: "application/msword" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "dashboard.doc";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleExportExcel = () => {
        const wb = XLSX.utils.book_new();
        roleData.charts?.forEach((chart) => {
            const sheetData = [["Label", "Value"], ...chart.data.datasets[0].data.map((value, index) => [
                chart.data.labels[index],
                value,
            ])];
            const ws = XLSX.utils.aoa_to_sheet(sheetData);
            XLSX.utils.book_append_sheet(wb, ws, chart.title || `Sheet${chart.id}`);
        });
        XLSX.writeFile(wb, "dashboard.xlsx");
    };

    const handleEmailSubmit = () => {
        // Lógica para enviar correo con análisis y archivos adjuntos
        console.log("Enviando correo a:", emailData);
        setShowEmailModal(false);
    };

    const [filters, setFilters] = useState({
        departamento: "",
        municipio: "",
        fechaInicio: "",
        fechaFin: "",
    });

    const iconMap = {
        "faShoppingCart": faShoppingCart,
        "faIndustry": faIndustry,
        "faChartLine": faChartLine,
        "faDollarSign": faDollarSign,
        "faCertificate": faCertificate,
        "faCalculator": faCalculator,
        "faExclamationTriangle": faExclamationTriangle,
        "faMapMarkedAlt": faMapMarkedAlt,
        "faCheckCircle": faCheckCircle,
        "faUsers": faUsers
    };

    // Cerrar modal con la tecla ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setShowEmailModal(false);
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

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
            <div className="title-dashboard">
                <h2>Dashboard - {role}</h2>
                <div>
                    <FontAwesomeIcon className="export-pdf" icon={faFilePdf} title="Exportar PDF" onClick={handleExportPDF} />
                    <FontAwesomeIcon className="export-excel" icon={faFileExcel} title="Exportar Excel" onClick={handleExportExcel} />
                    <FontAwesomeIcon className="send-email" icon={faEnvelope} title="Enviar por Correo" onClick={() => setShowEmailModal(true)} />

                </div>
            </div>


            {showEmailModal && (

                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>Enviar Reporte por Correo</h4>
                            <div className="close-icon" onClick={() => setShowEmailModal(false)}>
                                <span>&times;</span>
                            </div>
                        </div>

                        {/* Opción de personalizar análisis */}
                        <div className="form-group text-left">
                            <label htmlFor="analysis" className="label-with-icon">
                                {/* Aquí insertamos la imagen */}
                                Personaliza el análisis (opcional)
                                <img src="./sin_fondo_dos.PNG" alt="Bot IA" className="bot-icon-modal" />
                            </label>
                            <textarea
                                id="analysis"
                                placeholder="Escribe tu análisis personalizado..."
                                value={emailData.analysis}
                                onChange={(e) => setEmailData({ ...emailData, analysis: e.target.value })}
                            />
                        </div>

                        {/* Input para correos */}
                        <div className="form-group text-left">
                            <label htmlFor="recipients">Ingresa los correos separados por ";"</label>
                            <input
                                id="recipients"
                                type="text"
                                placeholder="ejemplo@correo.com; ejemplo2@correo.com"
                                value={emailData.recipients}
                                onChange={(e) => setEmailData({ ...emailData, recipients: e.target.value })}
                            />
                        </div>

                        {/* Opciones de Enviar ahora o Programar */}
                        <div className="schedule-options">
                            <label className="schedule-option">
                                <input
                                    type="radio"
                                    name="schedule"
                                    value="immediate"
                                    checked={emailData.schedule.immediate}
                                    onChange={() => setEmailData({ ...emailData, schedule: { immediate: true, date: "", recurrence: "" } })}
                                />
                                Enviar ahora
                            </label>
                            <label className="schedule-option">
                                <input
                                    type="radio"
                                    name="schedule"
                                    value="scheduled"
                                    checked={!emailData.schedule.immediate}
                                    onChange={() => setEmailData({ ...emailData, schedule: { immediate: false, date: "", recurrence: "" } })}
                                />
                                Programar envío
                            </label>
                        </div>

                        {/* Si "Programar envío" está seleccionado */}
                        {!emailData.schedule.immediate && (
                            <div className="form-recurrencia">
                                <div className="form-group">
                                    <label htmlFor="date">Fecha y Hora de envío</label>
                                    <input
                                        id="date"
                                        type="datetime-local"
                                        value={emailData.schedule.date}
                                        onChange={(e) => setEmailData({ ...emailData, schedule: { ...emailData.schedule, date: e.target.value } })}
                                    />
                                </div>

                                {/* Recurrencia de Envío */}
                                <div className="form-group">
                                    <label htmlFor="recurrence">Recurrencia</label>
                                    <div className="pill-container">
                                        {recurrenceOptions.map((option, index) => (
                                            <span
                                                key={index}
                                                className={`pill ${emailData.schedule.recurrence === option ? "selected" : ""}`}
                                                onClick={() => setEmailData({ ...emailData, schedule: { ...emailData.schedule, recurrence: option } })}
                                            >
                                                {option}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Botones del modal */}
                        <div className="modal-actions">
                            <button className="btn-submit" onClick={handleEmailSubmit}>Enviar</button>
                        </div>
                    </div>
                </div>

            )}
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
                            icon={indicator.icon ? iconMap[indicator.icon] : faFilter} // Si tienes íconos en los indicadores
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
                            <div className="chart-container-title">
                                <h3>{chart.title}</h3>
                                <img src="./sin_fondo_dos.PNG" alt="Bot IA" className="bot-icon-modal" />
                            </div>
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
