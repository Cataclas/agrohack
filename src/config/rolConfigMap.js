// En ../config/rolConfigMap.js
const rolConfigMap = {
    productor: [
      {
        position: [3.4372, -76.5225],
        popupText: `
          <strong>Cali - Valle del Cauca (Comprador)</strong><br>
          <em>Producto: Café Arábica de Alta Calidad</em><br>
          Volumen requerido: <strong>2000 kg</strong><br>
          Precio estimado: <strong>$4 USD/kg</strong><br>
          Ruta recomendada: <em>Cali -> Bogotá -> Medellín</em><br>
        `,
      },
      {
        position: [6.2518, -75.5636],
        popupText: `
          <strong>Medellín - Antioquia (Comprador)</strong><br>
          <em>Producto: Café Arábica Supremo</em><br>
          Volumen requerido: <strong>1500 kg</strong><br>
          Precio estimado: <strong>$4.5 USD/kg</strong><br>
          Ruta recomendada: <em>Medellín -> Barranquilla -> Bogotá</em><br>
        `,
      },
      {
        position: [11.2408, -74.1990],
        popupText: `
          <strong>Santa Marta - Magdalena (Distribuidor)</strong><br>
          Rutas de distribución: <em>Santa Marta -> Barranquilla -> Bogotá</em><br>
          Capacidad de distribución: <strong>5000 kg mensuales</strong><br>
        `,
      },
    ],
    comprador: [
      {
        position: [4.7110, -74.0721],
        popupText: `
          <strong>Bogotá - Cundinamarca (Productor)</strong><br>
          <em>Producto: Café Arábica Especial</em><br>
          Volumen disponible: <strong>1000 kg</strong><br>
          Certificación: <strong>Fair Trade</strong><br>
          Ruta recomendada: <em>Bogotá -> Manizales</em><br>
        `,
      },
      {
        position: [5.0678, -75.5174],
        popupText: `
          <strong>Manizales - Caldas (Productor)</strong><br>
          <em>Producto: Café Arábica Supremo</em><br>
          Volumen disponible: <strong>800 kg</strong><br>
          Certificación: <strong>Rainforest Alliance</strong><br>
          Ruta recomendada: <em>Manizales -> Medellín</em><br>
        `,
      },
      {
        position: [10.9685, -74.7813],
        popupText: `
          <strong>Barranquilla - Atlántico (Distribuidor)</strong><br>
          Rutas de distribución: <em>Barranquilla -> Santa Marta -> Medellín</em><br>
          Capacidad de distribución: <strong>4500 kg mensuales</strong><br>
        `,
      },
    ],
    distribuidor: [
      {
        position: [10.9685, -74.7813],
        popupText: `
          <strong>Barranquilla - Atlántico (Distribuidor)</strong><br>
          Rutas de distribución: <em>Barranquilla -> Santa Marta -> Medellín</em><br>
          Volumen distribuido: <strong>4500 kg mensuales</strong><br>
          Zona de cobertura: <strong>Costa Caribe</strong><br>
        `,
      },
      {
        position: [11.2408, -74.1990],
        popupText: `
          <strong>Santa Marta - Magdalena (Distribuidor)</strong><br>
          Rutas de distribución: <em>Santa Marta -> Barranquilla -> Bogotá</em><br>
          Volumen distribuido: <strong>5000 kg mensuales</strong><br>
          Zona de cobertura: <strong>Norte de Colombia</strong><br>
        `,
      },
      {
        position: [4.7110, -74.0721],
        popupText: `
          <strong>Bogotá - Cundinamarca (Distribuidor)</strong><br>
          Rutas de distribución: <em>Bogotá -> Manizales -> Medellín</em><br>
          Volumen distribuido: <strong>4000 kg mensuales</strong><br>
          Zona de cobertura: <strong>Centro y Norte de Colombia</strong><br>
        `,
      },
    ],
    guest: [
      {
        position: [4.6097, -74.0817],
        popupText: `
          <strong>Red de actores en el mercado de cafés especiales</strong><br>
          Explora productores, compradores, distribuidores y rutas de transporte.<br>
          Conoce las principales zonas de producción y distribución.
        `,
      },
    ],
};
  
export default rolConfigMap; // Exportación predeterminada
