// 📝 CORREGIDO: Eliminada importación innecesaria de ReactDOM (no se usa en componentes)
import React, { useState } from 'react';

/**
 * 📝 REFACTORIZADO COMPLETAMENTE:
 * 
 * ANTES: Cronómetro complejo con días/horas/minutos/segundos fuera de React
 * AHORA: Simple contador de clics usando useState (hook fundamental de React)
 * 
 * Conceptos clave de React demostrados:
 * 1. useState: Hook para manejar estado local del componente
 * 2. Event handlers: Funciones que responden a eventos del usuario
 * 3. Re-renderizado automático: React actualiza la UI cuando cambia el estado
 */
function Contador() {
    // 📝 useState: Hook que retorna [valorActual, funciónParaActualizar]
    // Cada vez que llamamos a setCount, React re-renderiza el componente automáticamente
    const [count, setCount] = useState(0);

    // 📝 Event Handlers: Funciones que actualizan el estado
    // React detecta el cambio y actualiza la UI automáticamente
    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    const reset = () => {
        setCount(0);
    };

    // 📝 Renderizado condicional: Cambiar estilos según el valor
    const getCounterColor = () => {
        if (count < 0) return 'text-danger';  // Rojo si es negativo
        if (count > 0) return 'text-success'; // Verde si es positivo
        return 'text-dark';                    // Negro si es cero
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-body text-center p-5">
                            <h1 className="card-title mb-4">Simple Counter</h1>
                            
                            {/* Display del contador con color dinámico */}
                            <div className={`display-1 fw-bold mb-4 ${getCounterColor()}`}>
                                {count}
                            </div>
                            
                            {/* 📝 Botones de control */}
                            {/* onClick recibe una REFERENCIA a la función, NO la ejecutamos */}
                            {/* CORRECTO: onClick={decrement} */}
                            {/* INCORRECTO: onClick={decrement()} ← esto ejecuta inmediatamente */}
                            <div className="d-flex gap-3 justify-content-center">
                                <button 
                                    className="btn btn-danger btn-lg px-4"
                                    onClick={decrement}
                                >
                                    <i className="fas fa-minus"></i> Decrementar
                                </button>
                                
                                <button 
                                    className="btn btn-secondary btn-lg px-4"
                                    onClick={reset}
                                >
                                    <i className="fas fa-redo"></i> Resetear
                                </button>
                                
                                <button 
                                    className="btn btn-success btn-lg px-4"
                                    onClick={increment}
                                >
                                    <i className="fas fa-plus"></i> Incrementar
                                </button>
                            </div>

                            {/* 📝 Información adicional con renderizado condicional */}
                            <div className="mt-4 text-muted">
                                <small>
                                    {count === 0 && "El contador está en cero"}
                                    {count > 0 && `${count} clics por encima de cero`}
                                    {count < 0 && `${Math.abs(count)} clics por debajo de cero`}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contador;
