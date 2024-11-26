import React from "react";
import Notificaciones from "../components/Notificaciones";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotificacionesPage = () => {
    const mockNotifications = [
        {
            title: "Nueva Oferta",
            message: "El precio del maíz bajó un 10% en el mercado.",
            detail: "Válido hasta el 30 de noviembre.",
            time: "Hace 5 minutos",
            unread: false,
            image: "/planta-logo.png"
        },
        {
            title: "Clima Actualizado",
            message: "Se esperan lluvias fuertes en tu región.",
            detail: "Protege tus cultivos para evitar daños.",
            time: "Hace 1 hora",
            unread: false,
            image: "/planta-logo.png"
        },
        {
            title: "Nuevo Mensaje",
            message: "Tu solicitud de crédito ha sido aprobada.",
            time: "Hace 2 horas",
            unread: false,
            image: "/planta-logo.png"
        },
        {
            title: "Evento de Capacitación",
            message: "Inscríbete al taller de agricultura sostenible.",
            detail: "Fecha: 15 de diciembre.",
            time: "Hace 3 horas",
            unread: false,
            image: "/planta-logo.png"
        },
        {
            title: "Notificación de Seguridad",
            message: "Se detectó un intento de acceso sospechoso.",
            detail: "Revisa la actividad reciente en tu cuenta.",
            time: "Hace 5 horas",
            unread: false,
            image: "/planta-logo.png"
        },
        {
            title: "Actualización de Producto",
            message: "Nuevo fertilizante orgánico disponible.",
            time: "Hace 1 día",
            unread: false,
            image: "/planta-logo.png"
        },
        {
            title: "Alerta de Cultivo",
            message: "Plaga detectada en tu área.",
            detail: "Consulta las recomendaciones para mitigación.",
            time: "Hace 2 días",
            unread: false,
            image: "/planta-logo.png"
        }

    ];
    {/*
                {
            title: "Nueva Oferta",
            message: "El precio del maíz bajó un 10% en el mercado.",
            detail: "Válido hasta el 30 de noviembre.",
            time: "Hace 5 minutos",
            unread: true,
            image: "/planta-logo.png"
        },
        {
            title: "Clima Actualizado",
            message: "Se esperan lluvias fuertes en tu región.",
            detail: "Protege tus cultivos para evitar daños.",
            time: "Hace 1 hora",
            unread: true,
            image: "/planta-logo.png"
        },
        {
            title: "Nuevo Mensaje",
            message: "Tu solicitud de crédito ha sido aprobada.",
            time: "Hace 2 horas",
            unread: false,
            image: "/planta-logo.png"
        },
        {
            title: "Evento de Capacitación",
            message: "Inscríbete al taller de agricultura sostenible.",
            detail: "Fecha: 15 de diciembre.",
            time: "Hace 3 horas",
            unread: true,
            image: "/planta-logo.png"
        },
        {
            title: "Notificación de Seguridad",
            message: "Se detectó un intento de acceso sospechoso.",
            detail: "Revisa la actividad reciente en tu cuenta.",
            time: "Hace 5 horas",
            unread: false,
            image: "/planta-logo.png"
        },
        {
            title: "Actualización de Producto",
            message: "Nuevo fertilizante orgánico disponible.",
            time: "Hace 1 día",
            unread: true,
            image: "/planta-logo.png"
        },
        {
            title: "Alerta de Cultivo",
            message: "Plaga detectada en tu área.",
            detail: "Consulta las recomendaciones para mitigación.",
            time: "Hace 2 días",
            unread: true,
            image: "/planta-logo.png"
        },
        {
            title: "Pago Procesado",
            message: "Tu pago de $50,000 fue recibido.",
            time: "Hace 3 días",
            unread: false,
            image: "/planta-logo.png"
        },
        {
            title: "Oferta Especial",
            message: "Compra semillas con un 20% de descuento.",
            detail: "Oferta válida hasta el 25 de noviembre.",
            time: "Hace 5 días",
            unread: true,
            image: "/planta-logo.png"
        },
        {
            title: "Nuevo Cliente",
            message: "Juan Pérez solicitó tu producto.",
            detail: "Ver detalles del pedido en tu panel.",
            time: "Hace 1 semana",
            unread: false,
            image: "/planta-logo.png"
        }*/}

    return (
        <div>
            <Header />
            <Notificaciones notifications={mockNotifications} />
            <Footer />
        </div>
    );
};

export default NotificacionesPage;
