import React from 'react';
import { products } from "../contexts/Products";
import './QrValidationPage.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
// Asegúrate de que la ruta sea correcta

const QrValidationPage = () => {
    // Simula que el producto es el primero de la lista como ejemplo
    const product = products[0];

    return (

        <div>
            <Header />
            <div id='qr'>
                <h1>{product.name}</h1>
                <p>Productor: {product.producer}</p>
                <p>Región: {product.region}</p>
                <p>Certificación: {product.certification}</p>
                <p>Producto Válido</p>
            </div>
            <Footer />
        </div>
    );
};

export default QrValidationPage;
