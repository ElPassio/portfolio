const preg = document.getElementById("question");
const opciones = Array.from(document.getElementsByClassName("op-texto"));
const progresotexto = document.getElementById("progresotexto");
const scoretexto = document.getElementById("score");
const barra = document.getElementById("barraprogresollena");

let preguntaactual = {};
let aceptarrespuestas = false;
let punt = 0;
let contador = 0;
let pregdisp = [];

let preguntas = [
  {
    "question": "Inside which HTML element do we put the JavaScript??",
    "choice1": "<script>",
    "choice2": "<javascript>",
    "choice3": "<js>",
    "choice4": "<scripting>",
    "answer": 1
  },
  {
    "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
    "choice1": "<script href='xxx.js'>",
    "choice2": "<script name='xxx.js'>",
    "choice3": "<script src='xxx.js'>",
    "choice4": "<script file='xxx.js'>",
    "answer": 3
  },
  {
    "question": " How do you write 'Hello World' in an alert box?",
    "choice1": "msgBox('Hello World');",
    "choice2": "alertBox('Hello World');",
    "choice3": "msg('Hello World');",
    "choice4": "alert('Hello World');",
    "answer": 4
  }
];

const bonus_correcto = 10;
const max_preg = 3;

startGame = () => {
  contador = 0;
  punt = 0;
  pregdisp = [...preguntas];
  obtenernuevapregunta();
};

obtenernuevapregunta = () => {
  if (pregdisp.length == 0 || contador > max_preg) {
    localStorage.setItem('masreciente', punt);
    return window.location.assign("fin.html");
  }

  contador++;
  progresotexto.innerText = `pregunta ${contador}/${max_preg}`;
  barraprogresollena.style.width = `${(contador / max_preg) * 100}%`

  Math.random() * 3; //NOS DA UN NUMERO ALEATORIO DE 0 A 3
  const preguntaindex = Math.floor(Math.random() * pregdisp.length);
  preguntaactual = pregdisp[preguntaindex];
  preg.innerText = preguntaactual.preg;
  opciones.forEach((op) => {
    const num = op.dataset["numero"];
    op.innerText = preguntaactual["op" + num];
  });
  pregdisp.splice(preguntaindex, 1);
  aceptarrespuestas = true;

};

opciones.forEach((op) => {
  op.addEventListener("click", (e) => {
    if (!aceptarrespuestas) return;
    aceptarrespuestas = false;
    const opseleccionada = e.target;
    const respuestaseleccionada = opseleccionada.dataset["number"];
    const claseAAplicar =
      respuestaseleccionada == preguntaactual.respuesta
        ? "correcto"
        : "incorrecto";

    if (claseAAplicar === "correcto") {
      incrementarscore(bonus_correcto);
    }

    opseleccionada.parentElement.classList.add(
      claseAAplicar
    ); /*AÑADIR UNA CLASE A UN ELEMENTO EN JS*/

    opseleccionada.parentElement.classList.add("animate__pulse");
    setTimeout(() => {
      opseleccionada.parentElement.classList.remove(claseAAplicar);
    
    
      obtenernuevapregunta();
    }, 1000);
  });
});

incrementarscore = num => {
  punt += num;
  scoretexto.innerText = punt;
};

