const roleConfig = {
  usuario: {
    dashboard: {
      indicators: [
        {
          id: "indicator-1",
          name: "Incidentes Totales",
          value: "12,450",
          color: "#E53935",
          icon: "faExclamationTriangle", // Icono para incidentes totales
        },
        {
          id: "indicator-2",
          name: "Zonas de Alta Criticidad",
          value: "15",
          color: "#FF5722",
          icon: "faMapMarkedAlt", // Icono para zonas críticas
        },
        {
          id: "indicator-3",
          name: "Reportes Confirmados",
          value: "9,200",
          color: "#4CAF50",
          icon: "faCheckCircle", // Icono para confirmados
        },
        {
          id: "indicator-4",
          name: "Incidentes Validados por Comunidad",
          value: "5,850",
          color: "#FF9800",
          icon: "faUsers", // Icono para validaciones comunitarias
        },
      ],
      charts: [
        // Participación ciudadana
        {
          id: "line",
          type: "line",
          title: "Participación Ciudadana en Reportes",
          data: {
            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
            datasets: [
              {
                label: "Reportes por Mes",
                borderColor: "#43A047",
                fill: false,
                data: [500, 600, 700, 800, 650, 900],
              },
            ],
          },
        },
        // Análisis predictivo
        {
          id: "line",
          type: "line",
          title: "Análisis Predictivo de Incidentes",
          data: {
            labels: ["Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            datasets: [
              {
                label: "Incidentes Reales",
                borderColor: "#E53935",
                fill: false,
                data: [850, 870, 900, 930, 950, 980],
              },
              {
                label: "Incidentes Predichos",
                borderColor: "#FFB300",
                fill: true,
                backgroundColor: "rgba(255, 179, 0, 0.4)",
                data: [860, 880, 910, 940, 970, 1000],
              },
            ],
          },
        },
        // Distribución de tipos de incidentes
        {
          id: "pie",
          title: "Distribución de Tipos de Incidentes",
          data: {
            labels: ["Robo", "Asalto", "Vandalismo", "Acoso", "Otros"],
            datasets: [
              {
                label: "Tipos de Incidentes",
                data: [1500, 2300, 1200, 3000, 450],
                backgroundColor: [

                  "#AED6F1", // Azul claro
                  "#F9E79F", // Amarillo claro
                  "#F5B7B1", // Rosa claro
                  "#D7BDE2", // Lila claro
                  "#A3E4D7", // Verde menta
                ],
              },
            ],
          },
        },
        // Tendencias temporales
        {
          id: "line",
          type: "line",
          title: "Tendencia de Incidentes Reportados",
          data: {
            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
            datasets: [
              {
                label: "Incidentes Confirmados",
                borderColor: "#E53935",
                fill: false,
                data: [300, 450, 600, 700, 550, 800],
              },
            ],
          },
        },

        // Incidentes por horario
        {
          id: "bar",
          type: "bar",
          title: "Incidentes por Horario",
          data: {
            labels: ["0-6 AM", "6-12 PM", "12-6 PM", "6-12 AM"],
            datasets: [
              {
                label: "Robo",
                backgroundColor: "#FF5733",
                data: [500, 800, 1200, 700],
              },
              {
                label: "Vandalismo",
                backgroundColor: "#33FF57",
                data: [300, 600, 900, 400],
              },
            ],
          },
          options: {
            scales: {
              x: { stacked: true },
              y: { stacked: true },
            },
          },
        },
        // Tiempo promedio de resolución
        {
          id: "bar",
          type: "bar",
          title: "Tiempo Promedio de Resolución",
          data: {
            labels: ["Robo", "Asalto", "Vandalismo", "Acoso", "Otros"],
            datasets: [
              {
                label: "Tiempo (horas)",
                backgroundColor: "#1E88E5",
                data: [8, 12, 6, 10, 5],
              },
            ],
          },
        },
      ],
    },
    notifications: {
      message:
        "Zonas de alta criticidad identificadas. Se recomienda aumentar la vigilancia en las áreas con mayor número de incidentes reportados.",
    },
    map: {
      layer: "incidentZones",
      data: Array.from({ length: 50 }, (_, i) => ({
        lat: Math.random() * 4.7 + 4.4, // Coordenadas aproximadas de Bogotá
        lng: Math.random() * -0.25 - 74,
        criticidad: ["Alta", "Media", "Baja"][Math.floor(Math.random() * 3)],
      })),
    },
  },
  distribuidor: {
    dashboard: {
      indicators: [
        { id: "indicator-1", name: "Envíos Realizados", value: "1,200", color: "#FFC107" },
        { id: "indicator-2", name: "Tiempo Promedio de Entrega", value: "3 días", color: "#03A9F4" },
        { id: "indicator-3", name: "Rutas Optimizadas", value: "85%", color: "#8BC34A" },
        { id: "indicator-4", name: "Costos Logísticos", value: "$150,000", color: "#F44336" },
      ],
      charts: [
        {
          id: "bar",
          title: "Volumen de Envíos Mensuales",
          data: {
            labels: ["Enero", "Febrero", "Marzo", "Abril"],
            datasets: [
              { label: "Volumen (Ton)", backgroundColor: "#FFC107", data: [300, 350, 400, 450] },
            ],
          },
        },
        {
          id: "line",
          title: "Tiempo Promedio de Entrega",
          data: {
            labels: ["Enero", "Febrero", "Marzo", "Abril"],
            datasets: [
              { label: "Tiempo (días)", borderColor: "#03A9F4", data: [3.5, 3.2, 3.0, 2.8] },
            ],
          },
        },
      ],
    },
    notifications: { message: "Se recomienda revisar rutas para reducir costos logísticos." },
    map: { layer: "distributionRoutes" },
  },
};

export default roleConfig;
