import React from 'react'
import ReactDOM from 'react-dom/client'


// index.css'
import '../styles/index.css'

// components
import Contador from './components/Contador';

let segundosTranscurridos = 0
let minutosTranscurridos = 0
let horasTranscurridas = 0
let diasTranscurridos = 0
let intervalo = null
const root = ReactDOM.createRoot(document.getElementById('root'));

function iniciarReloj (){
intervalo = setInterval(()=>{
    segundosTranscurridos++
root.render(
    <Contador dias={diasTranscurridos} horas= {horasTranscurridas} minutos={minutosTranscurridos} segundos= {segundosTranscurridos} parar = {pararIntervalo} reanudar = {reanudarIntervalo}/>
)

if (segundosTranscurridos === 60){
    segundosTranscurridos = 0
    minutosTranscurridos++
}
if (minutosTranscurridos === 60){
    minutosTranscurridos = 0
    horasTranscurridas++
}
if (horasTranscurridas === 24){
    horasTranscurridas = 0
    diasTranscurridos++
}
},1000)
}

iniciarReloj()
function pararIntervalo () {
    clearInterval(intervalo);
    intervalo = null
}

function reanudarIntervalo () {
    if (intervalo===null){
        iniciarReloj()
    }
}
