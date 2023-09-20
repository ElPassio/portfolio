const username = document.getElementById('username');
const saveScorebtn = document.getElementById('saveScorebtn');
const puntfinal = document.getElementById('puntfinal');
const masreciente = localStorage.getItem('masreciente');

const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
const max_highscores = 5;
console.log(highscores);

puntfinal.innerText = masreciente;
username.addEventListener('keyup', () =>{
    saveScorebtn.disabled = !username.value;
});

saveHS = e => {
    console.log("clicked the save button!");
    e.preventDefault();

    const score = {
        score: masreciente,
        name: username.value
    };
    highscores.push(score);

    highscores.sort((a,b) =>  b.score - a.score);
    highscores.splice(5);

    localStorage.setItem('highscores', JSON.stringify(highscores));
    window.location.assign("/");
    console.log(highscores);
};