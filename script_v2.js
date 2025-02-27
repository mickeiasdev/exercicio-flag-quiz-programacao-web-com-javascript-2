const locales = [];

const loadingLocales = async () => {
    const url = "https://restcountries.com/v2/all";
    await fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            locales.push({name: item.name, flag: item.flags.png});
        });
    })
    generateFlag()
}

const generateFlag = () => {
    const buttonOptions = [];
    const optionTrue = Math.floor((Math.random() * 3));
    for (let i = 0; i < 3; i++){
        let indice = (Math.floor((Math.random() * locales.length)));
        let locale = locales[indice];
        buttonOptions.push(locale);
        document.getElementById(`option${i}`).value = locale.name;
    }
    document.getElementById("flag").src = buttonOptions[optionTrue].flag;
    correctChoice = buttonOptions[optionTrue].name
}

const validation = (btn) => {
    const message = document.getElementById("message");
    const choice = btn.value;
    if (correctChoice === choice) {
        message.innerHTML = `Voce esta CORRETO! O pais era ${correctChoice}`;
    } else {
        message.innerHTML = `Voce esta ERRADO! O pais era ${correctChoice}`;
    }
    setTimeout(() => generateFlag(), 1500);
}

loadingLocales()