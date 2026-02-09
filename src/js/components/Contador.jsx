import React from 'react';


function Contador(props) {
    return <div className="container">

        <h1 className='hora'>
            ⏱️ {props.dias.toString().length === 2 ? props.dias : "00" + props.dias}:
            {props.horas.toString().length === 2 ? props.horas : "0" + props.horas}:
            {props.minutos.toString().length === 2 ? props.minutos : "0" + props.minutos}:
            {props.segundos.toString().length === 2 ? props.segundos : "0" + props.segundos}
        </h1>

        <div className='buttons'>
            <button className='btn' onClick={props.parar}>Parar el contador</button>
            <button className='btn' onClick={props.reanudar}>Reanudar el contador</button>
        </div>

    </div>
}
export default Contador;