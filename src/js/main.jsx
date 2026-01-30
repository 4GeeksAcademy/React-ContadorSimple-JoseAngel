import React from 'react'
import ReactDOM from 'react-dom/client'


// index.css'
import '../styles/index.css'

// components
import Contador from './components/Contador';

let segundosTranscurriddos = 0
let minutosTranscurridos = 0
let horasTranscurridas = 0
let diasTranscurridos = 0
let Intervalo = null
const root = ReactDOM.createRoot(document.getElementById('root'));

function iniciarRelog (){
Intervalo = setInterval(()=>{
    segundosTranscurriddos++
root.render(
    <Contador dias={diasTranscurridos} horas= {horasTranscurridas} minutos={minutosTranscurridos} segundos= {segundosTranscurriddos} Parar = {pararIntervalo} Reanudar = {reanudarIntervalo}/>
)

if (segundosTranscurriddos === 60){
    segundosTranscurriddos = 0
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
},15)
}

iniciarRelog()
function pararIntervalo () {
    clearInterval(Intervalo);
}

function reanudarIntervalo () {
    iniciarRelog()
}
