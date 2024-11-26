const roleConfig = {
  productor: {
    dashboard: {
      indicators: [
        { id: "indicator-1", name: "Producción Total", value: "1,500 Toneladas", color: "#4CAF50" },
        { id: "indicator-2", name: "Ingresos Totales", value: "$1,200,000", color: "#FF9800" },
        { id: "indicator-3", name: "Certificaciones Emitidas", value: "25", color: "#673AB7" },
        { id: "indicator-4", name: "Costos Operativos", value: "$800,000", color: "#E91E63" },
      ],
      charts: [
        {
          id: "bar",
          title: "Producción Mensual",
          data: {
            labels: ["Enero", "Febrero", "Marzo", "Abril"],
            datasets: [
              { label: "Producción (Ton)", backgroundColor: "#4CAF50", data: [150, 200, 250, 300] },
            ],
          },
        },
        {
          id: "line",
          title: "Costos Operativos",
          data: {
            labels: ["Enero", "Febrero", "Marzo", "Abril"],
            datasets: [
              { label: "Costos ($)", borderColor: "#E91E63", data: [200000, 190000, 210000, 220000] },
            ],
          },
        },
      ],
    },
    notifications: { message: "Recuerde revisar las predicciones de demanda para ajustar su producción." },
    map: { layer: "productionZones" },
  },
  comprador: {
    dashboard: {
      indicators: [
        { id: "indicator-1", name: "Compras Totales", value: "$2,000,000", color: "#2196F3" },
        { id: "indicator-2", name: "Proveedores Activos", value: "50", color: "#FF5722" },
        { id: "indicator-3", name: "Demanda Esperada", value: "2,500 Toneladas", color: "#FF9800" },
        { id: "indicator-4", name: "Costo Promedio Unitario", value: "$800", color: "#9C27B0" },
      ],
      charts: [
        {
          id: "line",
          title: "Crecimiento de Compras",
          data: {
            labels: ["2022", "2023", "2024"],
            datasets: [
              { label: "Compras ($)", borderColor: "#2196F3", data: [1800000, 2000000, 2200000] },
            ],
          },
        },
        {
          id: "pie",
          title: "Distribución de Proveedores",
          data: {
            labels: ["Colombia", "Brasil", "Etiopía"],
            datasets: [
              { label: "Proveedores", backgroundColor: ["#4CAF50", "#FF9800", "#2196F3"], data: [30, 15, 5] },
            ],
          },
        },
      ],
    },
    notifications: { message: "Las predicciones sugieren un aumento en la demanda de café etíope." },
    map: { layer: "buyingZones" },
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
