import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Configuración del ícono de marcador
L.Marker.prototype.options.icon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const Map = ({ center, zoom, markers }) => {
    return (
        <div className="map-container">
            <h1 className="map-title">Mapa del Sector Agro</h1>
            <MapContainer center={center} zoom={zoom} style={{ height: "80vh", width: "100%", "border-radius": "1rem" }}>
                {/* Tile layer - Mapa base de OpenStreetMap */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* Marcadores dinámicos */}
                {markers.map((marker, index) => (
                    <Marker key={index} position={marker.position}>
                        <Popup>{marker.popupText}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;
