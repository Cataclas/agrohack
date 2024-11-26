import React, { useEffect, useState } from "react";
import Map from "../components/Map";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MapPage = () => {
    const [markers, setMarkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                const response = await fetch("https://api-appgeo.onrender.com/municipios");
                if (!response.ok) {
                    throw new Error("Error al obtener los datos");
                }
                const data = await response.json();
                // Transformar los datos de la API al formato esperado por el componente Map
                const transformedMarkers = data.map(item => ({
                    position: [item.COORDINATES_Y, item.COORDINATES_X],
                    popupText: `${item.MUNICIPIO} - ${item.DEPARTAMENTO}`
                }));
                setMarkers(transformedMarkers);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMarkers();
    }, []);

    if (loading) return (
        <div>
            <Header />
            <p>Cargando marcadores...</p>
            <Footer />
        </div>
    );

    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container" id="map">
            <Header />
            <div className="main-content">
                <div className="map-container">
                    <Map center={[4.7110, -74.0721]} zoom={6} markers={markers} />
                </div>
                <div className="marker-info">
                    <h2>Datos de los Marcadores</h2>
                    <ul>
                        {markers.map((marker, index) => (
                            <li key={index}>
                                <strong>{marker.title}</strong><br />
                                {marker.description}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MapPage;
