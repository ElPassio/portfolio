var typed; // Define una variable global para almacenar la referencia de Typed

function initializeTyped(strings) {
    if (typed) {
        typed.destroy(); // Destruye el objeto Typed existente si ya existe
    }

    typed = new Typed("span.txt-rotate", {
        strings: strings,
        typeSpeed: 100,
        backSpeed: 50,
        fadeOut: false,
        smartBackspace: true,
        loop: true,
    });
}

(function ($) {
    initializeTyped(["I'm a software developer, and this is my page"]);
})(jQuery);

document.getElementById('languageButton').addEventListener('click', function() {
    var currentLang = document.documentElement.lang;

    if (currentLang === 'en') {
        loadTranslations('Portfolio/js/es.json');
        document.getElementById('languageFlag').src = 'images/es.png';
        document.documentElement.lang = 'es';
    } else {
        loadTranslations('Portfolio/js/en.json');
        document.getElementById('languageFlag').src = 'images/en.png';
        document.documentElement.lang = 'en';
    }
});

function loadTranslations(langFile) {
    fetch(langFile)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.home .titles h1').innerHTML = data.title;
            document.querySelector('.home .titles p').textContent = data.subtitle;
            document.querySelector('.home .titles .btn').textContent = data.btn_whatsapp;
            document.querySelector('.services .sec-title h2').textContent = data.knowledge;
            document.querySelector('.about .sec-title h2').textContent = data.about_me;
            document.getElementById('about-1').innerHTML = data.about_text1;
            document.getElementById('about-2').innerHTML = data.about_text2;
            document.getElementById('about-3').innerHTML = data.about_text3;
            document.querySelector('.work .sec-title h2').textContent = data.my_projects;
            document.querySelector('.proyecto1 h5').innerHTML = data.proyecto1_h5;
            document.querySelector('.proyecto1 p').innerHTML = data.proyecto1_p;
            document.querySelector('.proyecto2 h5').innerHTML = data.proyecto2_h5;
            document.querySelector('.proyecto2 p').innerHTML = data.proyecto2_p;
            
            document.querySelector('#footer h4').textContent = data.contact;
            initializeTyped(data.typed_strings);
        })
        .catch(error => console.error('Error loading translations:', error));
}