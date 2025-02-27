const A_MAIUSCULO = 65 // codigo do A em Intl
const locales = []
let correctChoice;

//-------------------------------------------------------------

const loadingLocales = () => {
    const intl = new Intl.DisplayNames(["pt"], {type: "region"});
    for (let i = 0; i < 26; i++) {
        for (let j = 0; j < 26; j++) {
            // retorna o codigo do A"65" + 1 que vai ser B"66" e sucessivamente
            let regionCode = String.fromCharCode(A_MAIUSCULO + i) + String.fromCharCode(A_MAIUSCULO + j);
            console.log(regionCode);
            // o nome do pais vai ser igual ao nome que o intl busca do codigo "BR = Brasil"
            let regionName = intl.of(regionCode);
            console.log(regionName);
            // se o nome for igual ao codigo "AA = AA", o codigo nao representa nenhum pais
            // logo ele nao adiciona ao array de locales
            if (regionName !== regionCode) {
                const locale = {} // o mesmo que apenas abir as chaves vazias { }
                locale.regionName = regionName
                locale.regionCode = regionCode
                locales.push(locale)
            } 
        }
    }
    generateFlag()
}

//-------------------------------------------------------------

const generateFlag = () => {
    // os tres botoes
    const buttonOptions = [];
    // sortear qual dos tres sera a opcao correta
    const optionTrue = Math.floor((Math.random() * 3));
    for (let i = 0; i < 3; i++){
        // escolhe 3 paises para as opcoes
        let indice = (Math.floor((Math.random() * locales.length)));
        let locale = locales[indice];
        buttonOptions.push(locale);
        document.getElementById(`option${i}`).value = locale.regionName;
    }
    //-------------------------------------------------------------
    console.log(buttonOptions); // mostra os 3 codigos dos paises
    console.log(optionTrue); // mostra o numero do botao correto
    //-------------------------------------------------------------
    // digo que a sigla do link do src deve virar
    // o codigo do pais, que é o item certo dos tres botoes gerados
    // assim busca o numero dentro do array de locales e pega o codigo
    // do objeto com .code e transforma em minuscula pra concatenar no link
    document.getElementById("flag").src = "https://flagcdn.com/w160/" + buttonOptions[optionTrue].regionCode.toLowerCase() + ".png";
    correctChoice = buttonOptions[optionTrue].regionName
}

//-------------------------------------------------------------

const validation = (btn) => {
    const message = document.getElementById("message");
    const choice = btn.value;
    if (correctChoice === choice) {
        message.innerHTML = `Voce esta CORRETO! O pais era ${correctChoice}`;
    } else {
        message.innerHTML = `Voce esta ERRADO! O pais era ${correctChoice}`;
    }
    setTimeout(() => generateFlag(), 2000);
}

//-------------------------------------------------------------

// eu carrego os locais e dentro da funcao de carregar os locais eu
// ja inicio a funcao pra trocar a bandeira / botoes, se eu clicar em
// algum botao vai iniciar a funcao pra validar a escolha
// assim com a funcao de bandeira dentro da validacao, trocara a bandeira
loadingLocales()