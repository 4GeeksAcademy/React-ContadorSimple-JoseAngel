import React from 'react'
import ReactDOM from 'react-dom/client'

// index.css'
import '../styles/index.css'

// components
import Contador from './components/Contador';

// 📝 CORREGIDO: Toda la lógica de estado debe estar DENTRO del componente usando hooks
// NUNCA manejar estado fuera de React - rompe el flujo de React
// NUNCA llamar a root.render() manualmente - React maneja los renders automáticamente

const root = ReactDOM.createRoot(document.getElementById('root'));

// 📝 Un render único - React se encarga del resto
root.render(
    <React.StrictMode>
        <Contador />
    </React.StrictMode>
);
