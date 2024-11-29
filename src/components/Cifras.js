import React, { useEffect, useState, useRef } from 'react';
import './Cifras.css';

const Cifras = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cifraRef = useRef(null);

  useEffect(() => {
    const targetCount = 1000;
    let currentCount = 0;

    const interval = setInterval(() => {
      if (currentCount < targetCount) {
        currentCount += Math.ceil(targetCount / 100);
        setCount(currentCount);
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // Detecta cuando el 50% del componente es visible
    );

    if (cifraRef.current) {
      observer.observe(cifraRef.current);
    }

    return () => {
      if (cifraRef.current) {
        observer.unobserve(cifraRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`cifras-container ${isVisible ? 'cifras-visible' : ''}`}
      ref={cifraRef}
    >
      <h2>Clientes Atendidos</h2>
      <div className="cifra">{count}</div>
    </div>
  );
};

export default Cifras;
