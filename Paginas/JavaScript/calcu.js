const botonnum = document.getElementsByName('data-numero');
const botonoper = document.getElementsByName('data-opera');
const botonigual = document.getElementsByName('data-igual')[0];
const botonborrar = document.getElementsByName('data-delete')[0];
var result = document.getElementById('result');
var opeActual = '';
var opeAnterior = '';
var operacion = undefined;

botonnum.forEach(function(boton){
    boton.addEventListener('click', function(){
        agregarNumero(boton.innerText);
    })
});

botonoper.forEach(function(boton){
    boton.addEventListener('click', function(){
        seleccionaroper(boton.innerText);
    })
});

botonigual.addEventListener('click', function(){
    calcular();
    actualizarDisplay();
});

botonborrar.addEventListener('click', function(){
    clear();
    actualizarDisplay();
});

function seleccionaroper(op){
    if(opeActual === '') return;
    if(opeAnterior != ''){
        calcular();
    }
    operacion = op.toString();
    opeAnterior = opeActual;
    opeActual = '';
}

function calcular(){
    var calculo;
    const anterior = parseFloat(opeAnterior);
    const actual = parseFloat(opeActual);
    if(isNaN(anterior) || isNaN(actual)) return;
        switch(operacion){
            case '+':
                calculo = anterior + actual;
                break;
            case 'x':
                calculo = anterior * actual;
                break;
            case '-':
                calculo = anterior - actual;
                break;
            case '%':
                calculo = anterior / actual;
                break;
            default:
                return;
            }
            opeActual = calculo;
            operacion = undefined;
            opeanterior = '';
}

function agregarNumero(num){
    opeActual = opeActual.toString() + num.toString();
    actualizarDisplay();
}

function clear(){
    opeActual = '';
    opeAnterior = '';
    operacion = undefined;
}

function actualizarDisplay(){
    result.value = opeActual;
}

