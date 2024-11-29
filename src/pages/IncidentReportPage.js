import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import './IncidentReportPage.css';

// Icono personalizado para Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const IncidentReportPage = () => {
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [useCurrentLocation, setUseCurrentLocation] = useState(true);
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [address, setAddress] = useState("");
    const [dateTimeNow, setDateTimeNow] = useState(true);
    const [customDateTime, setCustomDateTime] = useState({ date: "", time: "" });
    const [incidentType, setIncidentType] = useState("");
    const [description, setDescription] = useState("");
    const [fullName, setFullName] = useState("");
    const [identification, setIdentification] = useState("");
    const [incidentCategory, setIncidentCategory] = useState("sospecha");
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (navigator.geolocation && useCurrentLocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error obteniendo ubicación:", error);
                    alert("No se pudo obtener la ubicación.");
                }
            );
        }
    }, [useCurrentLocation]);

    const handleFileChange = (event) => {
        setFiles([...event.target.files]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const incidentData = {
            isAnonymous,
            location,
            address,
            dateTime: dateTimeNow
                ? new Date().toISOString()
                : `${customDateTime.date}T${customDateTime.time}`,
            incidentType,
            description,
            fullName: isAnonymous ? "Anónimo" : fullName,
            identification: isAnonymous ? "Anónimo" : identification,
            incidentCategory,
        };

        try {
            const response = await fetch("https://z25e8nlbxe.execute-api.us-east-1.amazonaws.com/default/reportes-incidente", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(incidentData),
            });

            if (response.ok) {
                alert("Incidente registrado exitosamente");
            } else {
                alert("Error al registrar el incidente");
            }
        } catch (error) {
            console.error("Error al registrar el incidente:", error);
            alert("Error al registrar el incidente");
        }
    };


    const LocationSelector = () => {
        const map = useMapEvents({
            click(e) {
                setLocation({
                    latitude: e.latlng.lat,
                    longitude: e.latlng.lng,
                });
            },
        });

        return location.latitude && location.longitude ? (
            <Marker position={[location.latitude, location.longitude]}></Marker>
        ) : null;
    };

    return (
        <div id="reporte">
            <Header />
            <div className="container-reporte">
                <h1>Registro de Incidentes</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={isAnonymous}
                                onChange={(e) => setIsAnonymous(e.target.checked)}
                            />
                            Reportar como anónimo
                        </label>
                    </div>

                    <div>
                        <label>
                            Ubicación:
                            <input
                                type="radio"
                                name="location"
                                checked={useCurrentLocation}
                                onChange={() => setUseCurrentLocation(true)}
                            />
                            Actual
                            <input
                                type="radio"
                                name="location"
                                checked={!useCurrentLocation}
                                onChange={() => setUseCurrentLocation(false)}
                            />
                            Otra
                        </label>
                    </div>

                    {!useCurrentLocation && (
                        <div>
                            <label>
                                Dirección:
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </label>

                            <label>
                                Ubicación:
                                <input
                                    type="text"
                                    value={`Latitud: ${location.latitude}, Longitud: ${location.longitude}`}
                                    readOnly
                                />
                            </label>
                            <div className="map-container">
                                <MapContainer
                                    center={[location.latitude || 0, location.longitude || 0]}
                                    zoom={13}
                                    style={{ height: "300px", width: "100%" }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <LocationSelector />
                                </MapContainer>
                            </div>
                        </div>
                    )}

                    <div>
                        <label>
                            Fecha y hora del evento:
                            <input
                                type="radio"
                                name="datetime"
                                checked={dateTimeNow}
                                onChange={() => setDateTimeNow(true)}
                            />
                            Ahora
                            <input
                                type="radio"
                                name="datetime"
                                checked={!dateTimeNow}
                                onChange={() => setDateTimeNow(false)}
                            />
                            Otra
                        </label>
                        {!dateTimeNow && (
                            <div>
                                <label>
                                    Fecha:
                                    <input
                                        type="date"
                                        value={customDateTime.date}
                                        onChange={(e) =>
                                            setCustomDateTime({ ...customDateTime, date: e.target.value })
                                        }
                                    />
                                </label>
                                <label>
                                    Hora:
                                    <input
                                        type="time"
                                        value={customDateTime.time}
                                        onChange={(e) =>
                                            setCustomDateTime({ ...customDateTime, time: e.target.value })
                                        }
                                    />
                                </label>
                            </div>
                        )}
                    </div>

                    <div>
                        <label>
                            Tipo de incidente:
                            <select
                                value={incidentType}
                                onChange={(e) => setIncidentType(e.target.value)}
                            >
                                <option value="">Seleccione</option>
                                <option value="hurto_comercio">Hurto a comercio</option>
                                <option value="hurto_personas">Hurto a personas</option>
                                <option value="hurto_residencias">Hurto a residencias</option>
                                <option value="otros">Otros</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            Categoría del incidente:
                            <select
                                value={incidentCategory}
                                onChange={(e) => setIncidentCategory(e.target.value)}
                            >
                                <option value="sospecha">Zona insegura (Sospecha)</option>
                                <option value="evento">Evento</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            Descripción del incidente:
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </label>
                    </div>

                    {!isAnonymous && (
                        <>
                            <div>
                                <label>
                                    Nombre completo:
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Identificación:
                                    <input
                                        type="text"
                                        value={identification}
                                        onChange={(e) => setIdentification(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>
                        </>
                    )}

                    <div>
                        <label>
                            Evidencias:
                            <input
                                type="file"
                                accept="image/*,video/*"
                                multiple
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>

                    <button type="submit">Registrar Incidente</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default IncidentReportPage;
