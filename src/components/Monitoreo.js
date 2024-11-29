import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.awesome-markers";
import "leaflet.heat"; // Importa el complemento de heatmap
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import reportes from "../config/reportes";
import "./Monitoreo.css";

// Configuración del ícono del marcador
L.Marker.prototype.options.icon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const icons = {
    user: L.AwesomeMarkers.icon({
        icon: "user",
        prefix: "fa", // Clase FontAwesome (fa-)
        markerColor: "blue", // Color del marcador
        iconColor: "white", // Color del ícono
    }),
    hospital: L.AwesomeMarkers.icon({
        icon: "hospital",
        prefix: "fa",
        markerColor: "red",
        iconColor: "white",
    }),
    fire_station: L.AwesomeMarkers.icon({
        icon: "fire-extinguisher",
        prefix: "fa",
        markerColor: "orange",
        iconColor: "black",
    }),
    police: L.AwesomeMarkers.icon({
        icon: "shield-alt",
        prefix: "fa",
        markerColor: "green",
        iconColor: "white",
    }),
};

const HeatMapLayer = ({ data }) => {
    const map = useMap(); // Obtén el contexto del mapa
    React.useEffect(() => {
        if (data.length > 0) {
            const heatLayer = L.heatLayer(data, { radius: 20, blur: 15 });
            heatLayer.addTo(map);

            // Limpieza para evitar capas duplicadas
            return () => {
                map.removeLayer(heatLayer);
            };
        }
    }, [data, map]);

    return null;
};

const Map = ({ center, zoom, markers, onMarkerSelect }) => {
    const heatMapData = reportes.map((reporte) => [
        reporte.ubicacion[0],
        reporte.ubicacion[1],
        reporte.criticidad === "Alta" ? 0.8 : 0.5, // Peso según criticidad
    ]);

    return (
        <MapContainer center={center} zoom={zoom} style={{ height: "80vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Heatmap */}
            <HeatMapLayer data={heatMapData} />

            {/* Marcador del usuario */}
            <Marker position={center} icon={icons.user}>
                <Popup>Tu ubicación</Popup>
            </Marker>

            {/* Otros marcadores */}
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    position={marker.position}
                    icon={icons[marker.type] || icons.user}
                    eventHandlers={{
                        click: () => onMarkerSelect(marker),
                    }}
                >
                    <Popup>{marker.popupText}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
