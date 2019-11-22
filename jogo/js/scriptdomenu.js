(function(){

    startMenu();

    function startMenu(){
        
            var Jogar = document.querySelector("#Jogar");    
            Jogar.addEventListener("click", Entrar);

            var ComoJogar = document.querySelector("#ComoJogar");
            ComoJogar.addEventListener("click", CJogar)
    }
    function Entrar(){
            window.location.href = "Parte1.html"
    }

    function CJogar(){
            window.location.href = "ComoJogar.html"
    }
    
}());