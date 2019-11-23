(function(){

    startMenu();

    function startMenu(){
        
            var Jogar = document.querySelector("#Jogar");    
            Jogar.addEventListener("click", Entrar);

            var ComoJogar = document.querySelector("#ComoJogar");
            ComoJogar.addEventListener("click", CJogar);

            var Sair = document.querySelector("#Sair");
            Sair.addEventListener("click", Voltar);
    }
    function Entrar(){
            window.location.href = "Parte1.html"
    }

    function CJogar(){
            window.location.href = "ComoJogar.html"
    }

    function Voltar(){
            window.open("https://pedrosayuri.github.io/");
    }

}());