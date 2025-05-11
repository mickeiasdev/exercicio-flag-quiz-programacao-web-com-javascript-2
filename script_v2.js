const locales = [];

const loadingLocales = async () => {
    const url = "https://restcountries.com/v2/all";
    await fetch(url)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                locales.push({ name: item.name, flag: item.flags.png });
            });
        });
    generateFlag();
};

let correctChoice = "";

const generateFlag = () => {
    const buttonOptions = [];
    const optionTrue = Math.floor(Math.random() * 3);
    for (let i = 0; i < 3; i++) {
        let indice = Math.floor(Math.random() * locales.length);
        let locale = locales[indice];
        buttonOptions.push(locale);
        document.getElementById(`option${i}`).value = locale.name;
    }
    document.getElementById("flag").src = buttonOptions[optionTrue].flag;
    correctChoice = buttonOptions[optionTrue].name;
};

let tentativas = 0;
let pontuacao = 0;

const validation = (btn) => {
    const message = document.getElementById("message");
    const resultado = document.getElementById("resultado");
    const choice = btn.value;

    if (correctChoice === choice) {
        pontuacao++;
        message.innerHTML = `Voce esta CORRETO! O pais era ${correctChoice}`;
    } else {
        message.innerHTML = `Voce esta ERRADO! O pais era ${correctChoice}`;
    }

    tentativas++;
    console.log(`Tentativas: ${tentativas} / Pontuação: ${pontuacao}`);

    setTimeout(() => {
        if (tentativas === 10) {
            if (pontuacao >= 7) {
                resultado.innerHTML = `Parabens! Voce conseguiu ${pontuacao} acertos!`;
            } else {
                resultado.innerHTML = `Voce conseguiu ${pontuacao} acertos e nao atingiu a pontuacao minima!`;
            }

            setTimeout(() => {
                tentativas = 0;
                pontuacao = 0;
                resultado.innerHTML = "";
                message.innerHTML = "";
                generateFlag();
            }, 2000);
        } else {
            setTimeout(() => generateFlag(), 1500);
        }
    });
};

loadingLocales();
