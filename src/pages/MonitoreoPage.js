import React, { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import Map from "../components/Map";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "leaflet/dist/leaflet.css";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import "@fortawesome/fontawesome-free/css/all.css";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

const getOverpassQuery = (bbox) => `
  [out:json];
  (
    node["amenity"="police"](${bbox});
    node["amenity"="fire_station"](${bbox});
    node["amenity"="hospital"](${bbox});
  );
  out body;
  >;
  out skel qt;
`;

const MapPage = () => {
    const [markers, setMarkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [distance, setDistance] = useState(null);

    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(async (position) => {
                        const { latitude, longitude } = position.coords;
                        setUserLocation([latitude, longitude]);
                        console.log("Ubicación del usuario:", [latitude, longitude]);

                        const bbox = `${latitude - 0.1},${longitude - 0.1},${latitude + 0.1},${longitude + 0.1}`;
                        const response = await fetch(OVERPASS_URL, {
                            method: "POST",
                            headers: { "Content-Type": "application/x-www-form-urlencoded" },
                            body: `data=${encodeURIComponent(getOverpassQuery(bbox))}`,
                        });

                        if (!response.ok) throw new Error(`Error en la API: ${response.statusText}`);
                        const data = await response.json();

                        const markersData = data.elements.map((element) => ({
                            position: [element.lat, element.lon],
                            popupText: `
                                <strong>${element.tags.name || "Sin nombre"}</strong><br/>
                                Tipo: ${getAmenityNameInSpanish(element.tags.amenity)}<br/>
                                Dirección: ${element.tags["addr:full"] || "No disponible"}<br/>
                                Teléfono: ${element.tags["contact:phone"] || "No disponible"}
                            `,
                            type: element.tags.amenity,
                        }));
                        setMarkers(markersData);
                        setLoading(false);
                    });
                } else {
                    alert("La geolocalización no está soportada en este navegador.");
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error al obtener datos de Overpass:", error);
                setLoading(false);
            }
        };

        fetchMarkers();
    }, []);

    const getAmenityNameInSpanish = (amenity) => {
        const translations = {
            police: "Policía",
            fire_station: "Estación de Bomberos",
            hospital: "Hospital",
        };
        return translations[amenity] || "Otro";
    };

    const handleMarkerSelect = (marker) => {
        setSelectedMarker(marker);
        setDistance(calculateDistance(marker.position));
    };

    const calculateDistance = (markerPosition) => {
        if (userLocation) {
            const [lat1, lon1] = userLocation;
            const [lat2, lon2] = markerPosition;
            const R = 6371; // Radio de la Tierra en km
            const dLat = ((lat2 - lat1) * Math.PI) / 180;
            const dLon = ((lon2 - lon1) * Math.PI) / 180;
            const a =
                Math.sin(dLat / 2) ** 2 +
                Math.cos((lat1 * Math.PI) / 180) *
                Math.cos((lat2 * Math.PI) / 180) *
                Math.sin(dLon / 2) ** 2;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return (R * c).toFixed(2);
        }
        return null;
    };

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
            <div className="main-content-monitor">
                <Filtros />

                <Map
                    center={userLocation || [4.711, -74.0721]}
                    zoom={userLocation ? 13 : 6}
                    markers={markers}
                    onMarkerSelect={handleMarkerSelect}
                    userLocation={userLocation}
                />
                {selectedMarker && (
                    <div className="info-panel">
                        <h3>Información del marcador:</h3>
                        <p dangerouslySetInnerHTML={{ __html: selectedMarker.popupText }} />
                        {distance && <p>Distancia: {distance} km</p>}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MapPage;
