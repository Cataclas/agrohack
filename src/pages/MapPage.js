import React, { useEffect, useState } from "react";
import Map from "../components/Map";
import Header from "../components/Header";
import Footer from "../components/Footer";
import rolConfigMap from "../config/rolConfigMap";
import { useUser } from "../contexts/UserContext";
import ChartAnalysis from "../components/ChartAnalysis";

const MapPage = () => {
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [loading, setLoading] = useState(true);
    const { role } = useUser();
    const [filters, setFilters] = useState({ keyword: "", region: "", dateRange: { start: "", end: "" } });

    useEffect(() => {
        if (role && rolConfigMap[role]) {
            setMarkers(rolConfigMap[role]);
        } else {
            setMarkers(rolConfigMap.guest || []);
        }
        setLoading(false);
    }, [role]);

    const handleMarkerSelect = (marker) => {
        setSelectedMarker(marker);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleDateRangeChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            dateRange: { ...filters.dateRange, [name]: value },
        });
    };

    const filteredMarkers = markers.filter((marker) => {
        const matchesKeyword = marker.popupText.toLowerCase().includes(filters.keyword.toLowerCase());
        const matchesRegion = filters.region ? marker.region === filters.region : true;
        const matchesDate =
            (!filters.dateRange.start || new Date(marker.date) >= new Date(filters.dateRange.start)) &&
            (!filters.dateRange.end || new Date(marker.date) <= new Date(filters.dateRange.end));
        return matchesKeyword && matchesRegion && matchesDate;
    });

    if (loading) {
        return (
            <div>
                <Header />
                <p>Cargando marcadores...</p>
                <Footer />
            </div>
        );
    }

    return (
        <div className="container" id="map">
            <Header />
            <div className="main-content">
                <div className="filters-panel">
                    <h2>Filtros</h2>
                    <input
                        type="text"
                        name="keyword"
                        placeholder="Buscar por texto..."
                        value={filters.keyword}
                        onChange={handleFilterChange}
                        className="filter-input"
                    />
                    <select
                        name="region"
                        value={filters.region}
                        onChange={handleFilterChange}
                        className="filter-select"
                    >
                        <option value="">Todas las regiones</option>
                        <option value="andina">Región Andina</option>
                        <option value="cafetera">Región Cafetera</option>
                        <option value="caribe">Región Caribe</option>
                    </select>
                    <div className="date-filters">
                        <label>
                            Desde:
                            <input
                                type="date"
                                name="start"
                                value={filters.dateRange.start}
                                onChange={handleDateRangeChange}
                            />
                        </label>
                        <label>
                            Hasta:
                            <input
                                type="date"
                                name="end"
                                value={filters.dateRange.end}
                                onChange={handleDateRangeChange}
                            />
                        </label>
                    </div>
                </div>
                <div className="content-panel">
                    <div className="map-container">
                        <Map
                            center={[4.711, -74.0721]}
                            zoom={6}
                            markers={filteredMarkers}
                            onMarkerSelect={handleMarkerSelect}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MapPage;
