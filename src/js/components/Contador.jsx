import React from 'react';

/**
 * Contador Component
 * 
 * 📝 IMPORTANTE: Estado manual (FUERA de React)
 * 
 * Este componente demuestra la forma ORIGINAL de manejar estado en React,
 * ANTES de que existieran hooks (useState, useEffect).
 * 
 * Conceptos pedagógicos:
 * 1. Estado en variables JavaScript simples (no en React state)
 * 2. Necesidad de re-renderizar manualmente
 * 3. Importancia de limpiar setInterval
 * 4. Por qué React state es mejor que esto
 * 
 * ESTA ES LA FORMA MÁS PURA DE ENTENDER EL PROBLEMA
 * que React soluciona con hooks.
 */

// 📝 ESTADO MANUAL - Variables fuera del componente
// Este es el patrón ORIGINAL de React (pre-hooks era así)
let count = 0;
let isRunning = false;
let intervalId = null;

// Referencia al root para re-renderizar manualmente
let renderCallback = null;

/**
 * Función para re-renderizar el componente
 * (En React antiguo, esto se hacía manualmente)
 */
const triggerRender = () => {
    if (renderCallback) {
        renderCallback();
    }
};

/**
 * Formatea el número con 6 dígitos y ceros a la izquierda
 * @param {number} num - Número a formatear
 * @returns {string} - Número formateado (ej: "000042")
 */
const formatCounter = (num) => {
    return String(num).padStart(6, '0');
};

/**
 * Inicia el contador automático
 * Incrementa cada 1000ms (1 segundo)
 */
const startCounter = () => {
    if (!isRunning) {
        isRunning = true;
        
        // 📝 setInterval ejecuta código cada 1 segundo
        intervalId = setInterval(() => {
            count++;  // Incrementa el estado manual
            triggerRender();  // Re-renderiza manualmente
        }, 1000);
        
        triggerRender();
    }
};

/**
 * Detiene el contador
 * CRÍTICO: Limpia el interval para prevenir memory leaks
 */
const stopCounter = () => {
    if (isRunning) {
        isRunning = false;
        
        // 📝 clearInterval DETIENE la ejecución del setInterval
        // SIN ESTO = memory leak (el interval sigue corriendo en background)
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        
        triggerRender();
    }
};

/**
 * Reinicia el contador a 0
 */
const resetCounter = () => {
    stopCounter();
    count = 0;
    triggerRender();
};

/**
 * Toggle: Si está corriendo, pausa. Si está pausado, reanuda.
 */
const toggleCounter = () => {
    if (isRunning) {
        stopCounter();
    } else {
        startCounter();
    }
};

/**
 * Componente Contador
 * 
 * Nota: Este es un componente funcional PURO.
 * No tiene estado interno de React.
 * El estado está en variables globales arriba.
 */
function Contador() {
    // Guardar referencia al render para actualizaciones manuales
    React.useLayoutEffect(() => {
        renderCallback = () => {};  // Placeholder para trigger renders
        
        // Limpiar cuando el componente se desmonta
        return () => {
            stopCounter();  // Asegurar que se limpia el interval
            renderCallback = null;
        };
    }, []);

    const formattedCount = formatCounter(count);
    const buttonText = isRunning ? 'Pausar' : 'Reanudar';
    const statusText = isRunning ? 'En ejecución' : 'Pausado';
    const statusClass = isRunning ? 'running' : 'paused';

    return (
        <div className="container-counter">
            <div className="counter-wrapper">
                {/* Título con icono de reloj */}
                <h1 className="counter-title">
                    <i className="fas fa-clock"></i> Simple Counter
                </h1>

                {/* Display del contador con 6 dígitos */}
                <div className="hora">
                    {formattedCount}
                </div>

                {/* Botones de control */}
                <div className="buttons">
                    <button
                        className="btn btn-stop"
                        onClick={toggleCounter}
                        title={isRunning ? "Pausar contador" : "Reanudar contador"}
                    >
                        <i className={`fas ${isRunning ? 'fa-pause' : 'fa-play'}`}></i>
                        {buttonText}
                    </button>

                    <button
                        className="btn btn-reset"
                        onClick={resetCounter}
                        title="Reiniciar contador a 0"
                    >
                        <i className="fas fa-redo"></i> Resetear
                    </button>
                </div>

                {/* Indicador de estado */}
                <div className="status-indicator">
                    <span className={`status-dot ${statusClass}`}></span>
                    <span className="status-text">
                        {statusText}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Contador;
